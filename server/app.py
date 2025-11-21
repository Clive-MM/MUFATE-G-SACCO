# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
from sqlalchemy import text, create_engine
import os

from models.models import db, IsActive, FeedbackStatus
from cloudinary_config import cloudinary
from routes.routes import routes, bcrypt, jwt, register_mail_instance

# -----------------------------
# Load environment variables
# -----------------------------
load_dotenv(dotenv_path=".mufate_env")

# -----------------------------
# Create Flask app
# -----------------------------
app = Flask(__name__)

# CORS: allow Vercel frontend and main site to call this backend
CORS(
    app,
    resources={r"/*": {"origins": [
        "https://mufate-g-sacco.vercel.app"
    ]}}
)

# -----------------------------
# Core config
# -----------------------------
DATABASE_URL = os.getenv("DATABASE_URL")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_IDENTITY_CLAIM"] = "identity"

# Mail config
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT", "587"))
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS", "True") == "True"
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_DEFAULT_SENDER")

# -----------------------------
# Init extensions
# -----------------------------
db.init_app(app)
mail = Mail(app)
bcrypt.init_app(app)
jwt.init_app(app)
register_mail_instance(mail)

# -----------------------------
# Helper: ensure DB + tables exist (runs every startup, but idempotent)
# -----------------------------
def init_database_once():
    """
    1. Connect to server-level 'master' DB.
    2. Create MUFATE_G_SACCO_WEB if it doesn't exist.
    3. Create all tables from SQLAlchemy models.
    4. Seed IsActive and FeedbackStatus if empty.
    """

    if not DATABASE_URL:
        print("❌ DATABASE_URL is not set. Skipping DB init.")
        return

    print("🔄 Initializing database (if needed)...")

    # Split DATABASE_URL into:
    # base: mssql+pyodbc://user:pwd@server\instance
    # rest: MUFATE_G_SACCO_WEB?driver=ODBC+Driver+17+for+SQL+Server
    try:
        base, rest = DATABASE_URL.rsplit("/", 1)
    except ValueError:
        print("❌ DATABASE_URL format unexpected:", DATABASE_URL)
        return

    if "?" in rest:
        db_name, query = rest.split("?", 1)
        query_part = "?" + query
    else:
        db_name = rest
        query_part = ""

    # Build server-level URL pointing to master database
    server_level_url = f"{base}/master{query_part}"

    # 1️⃣ Ensure the database exists
    engine = create_engine(server_level_url)

    with engine.connect() as conn:
        conn.execute(
            text(
                f"IF DB_ID('{db_name}') IS NULL "
                f"BEGIN "
                f"    PRINT 'Creating database {db_name}'; "
                f"    CREATE DATABASE [{db_name}]; "
                f"END"
            )
        )
        conn.commit()

    print(f"✅ Database '{db_name}' is present / ready.")

    # 2️⃣ Ensure all tables exist
    db.create_all()
    print("✅ All tables are created / already present.")

    # 3️⃣ Seed reference data if needed
    if not IsActive.query.first():
        db.session.add_all([
            IsActive(Status="Active"),
            IsActive(Status="Inactive")
        ])
        print("🌱 Seeded IsActive")

    if not FeedbackStatus.query.first():
        db.session.add_all([
            FeedbackStatus(StatusName="Unread"),
            FeedbackStatus(StatusName="Read")
        ])
        print("🌱 Seeded FeedbackStatus")

    db.session.commit()
    print("✅ Seeding completed (if required).")


# -----------------------------
# Blueprints
# -----------------------------
app.register_blueprint(routes)

# -----------------------------
# Run DB init at startup
# (works for both local `python app.py` and WSGI servers)
# -----------------------------
with app.app_context():
    init_database_once()
    print("✅ DB initialization completed. Backend is ready.")


# -----------------------------
# Health endpoint to confirm DB connectivity
# -----------------------------
@app.get("/_health/db")
def db_health():
    try:
        # lightweight ping
        with db.engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return jsonify(ok=True), 200
    except Exception as e:
        return jsonify(ok=False, error=str(e)), 500


# -----------------------------
# Root route
# -----------------------------
@app.get("/")
def index():
    return "Hello MUFATE G SACCO"


# -----------------------------
# Local dev
# -----------------------------
if __name__ == "__main__":
    print("➡ Using DATABASE_URL:", os.getenv("DATABASE_URL"))
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
