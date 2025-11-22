# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
from sqlalchemy import text
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
bcrypt.init_app(bcrypt)
jwt.init_app(app)
register_mail_instance(mail)

# -----------------------------
# Helper: lightweight DB check
# -----------------------------
_db_checked = False


def init_database_once():
    """
    On startup, just verify that the configured database is reachable.

    All tables and seed data are assumed to already exist (you created
    them in SQL Server / SSMS). We DO NOT run db.create_all() or CREATE DATABASE
    on Render to avoid timeouts and communication link failures.
    """
    global _db_checked

    if _db_checked:
        return

    if not DATABASE_URL:
        print("❌ DATABASE_URL is not set. Skipping DB check.")
        return

    print("🔄 Checking database connectivity...")

    try:
        # Use the engine that SQLAlchemy already created for this app
        engine = db.engine

        # Very light ping
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))

        print("✅ Database 'MUFATE_G_SACCO_WEB' is present / reachable.")
        _db_checked = True

    except Exception as e:
        print("❌ Database connectivity check failed:", e)
        # Let the error bubble up so Render shows it in logs
        raise


# -----------------------------
# Blueprints
# -----------------------------
app.register_blueprint(routes)

# -----------------------------
# Run DB check at startup
# (works for both local `python app.py` and WSGI servers)
# -----------------------------
with app.app_context():
    init_database_once()
    print("✅ DB check completed. Backend is ready.")


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
