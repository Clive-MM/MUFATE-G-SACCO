from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
import os

from models.models import db, IsActive, FeedbackStatus
from cloudinary_config import cloudinary  # assuming this initializes Cloudinary
from routes.routes import routes, bcrypt, jwt, init_mail # routes module will consume mail instance

# ✅ Load environment variables from .mufate_env
load_dotenv(dotenv_path=".mufate_env")

# ✅ Initialize Flask app
app = Flask(__name__)
CORS(app)

# ✅ Load environment configurations
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_IDENTITY_CLAIM'] = 'identity'

# ✅ Mail configuration from environment variables
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

# ✅ Initialize Flask extensions
db.init_app(app)
mail = Mail(app)
bcrypt.init_app(app)
jwt.init_app(app)

# ✅ Pass mail instance to the routes module
routes.mail = mail
app.register_blueprint(routes)

# ✅ Create DB tables and seed initial values
with app.app_context():
    db.create_all()
    print("✅ Tables created successfully from models.py")

    if not IsActive.query.first():
        db.session.add_all([
            IsActive(Status="Active"),
            IsActive(Status="Inactive")
        ])

    if not FeedbackStatus.query.first():
        db.session.add_all([
            FeedbackStatus(StatusName="Unread"),
            FeedbackStatus(StatusName="Read")
        ])

    db.session.commit()
    print("✅ Seeded IsActive and FeedbackStatus tables!")

# ✅ Test DB connection
with app.app_context():
    try:
        db.engine.connect()
        print("✅ Connection to MUFATE_G_SACCO was successful!")
    except Exception as e:
        print("❌ Failed to connect to SQL Server:", e)

# ✅ Root test route
@app.route('/')
def index():
    return "Hello MUFATE G SACCO"

# ✅ Local server run
if __name__ == "__main__":
    app.run()
