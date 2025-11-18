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
CORS(app)

# -----------------------------
# Core config (MySQL via PyMySQL)
# -----------------------------
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
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
# Blueprints
# -----------------------------
app.register_blueprint(routes)

# -----------------------------
# Optional: One-time create/seed
# Set RUN_CREATE_ALL=1 in env to run this block on boot (one-off),
# otherwise it is skipped so the app can start even if DB is down.
# -----------------------------
if os.getenv("RUN_CREATE_ALL") == "1":
    with app.app_context():
        db.create_all()
        print("✅ Tables created successfully")

        if not IsActive.query.first():
            db.session.add_all([IsActive(Status="Active"), IsActive(Status="Inactive")])

        if not FeedbackStatus.query.first():
            db.session.add_all([FeedbackStatus(StatusName="Unread"), FeedbackStatus(StatusName="Read")])

        db.session.commit()
        print("✅ Seeded IsActive and FeedbackStatus")

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
    # Useful for local testing
    print("➡ Using DATABASE_URL:", os.getenv("DATABASE_URL"))
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
    