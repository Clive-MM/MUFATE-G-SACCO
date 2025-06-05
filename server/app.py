from flask import Flask
from models.models import db, IsActive, FeedbackStatus  
from cloudinary_config import cloudinary
from flask_cors import CORS
import os
from dotenv import load_dotenv


# ✅ Load environment variables from custom file
load_dotenv(dotenv_path=".mufate_env")

app = Flask(__name__)

CORS(app)


# ✅ Configuration



# ✅ Load DB URI from environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_IDENTITY_CLAIM'] = 'identity'


# ✅ Initialize DB
db.init_app(app)

# ✅ Import and register routes AFTER app is created
from routes.routes import routes, bcrypt, jwt  
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

# ✅ Run server
if __name__ == "__main__":
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["DEBUG"] = True
    app.run(debug=True)
