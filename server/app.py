from flask import Flask
from models.models import db, IsActive, FeedbackStatus  
from cloudinary_config import cloudinary
from flask_cors import CORS
from flask_mail import Mail  # ✅ NEW
import os
from dotenv import load_dotenv

# ✅ Load environment variables from .mufate_env
load_dotenv(dotenv_path=".mufate_env")

app = Flask(__name__)
CORS(app)

# ✅ Load DB URI and other configurations
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_IDENTITY_CLAIM'] = 'identity'

# ✅ Email Configuration from environment
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

# ✅ Initialize DB and Mail
db.init_app(app)
mail = Mail(app)  # ✅ NEW

# ✅ Make mail instance accessible to routes
from routes.routes import routes, bcrypt, jwt
routes.mail = mail  # ✅ Pass mail to routes module
bcrypt.init_app(app)
jwt.init_app(app)
app.register_blueprint(routes)

# ✅ Create tables and seed default data
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

# ✅ Home route
@app.route('/')
def index():
    return "Hello MUFATE G SACCO"

# ✅ Run server (local only)
if __name__ == "__main__":
    app.run()
