from flask import Flask
from models.models import db, IsActive, FeedbackStatus  
from cloudinary_config import cloudinary



app = Flask(__name__)

# ✅ Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = (
    "mssql+pyodbc://@localhost,1433/MUFATE_G_SACCO"
    "?driver=ODBC+Driver+17+for+SQL+Server&Trusted_Connection=yes"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'GYwNuK5IA72w8sH_fVxYcOWtY0RJ9wBrP5B93RvBEG06NC5ETopjLjRSNQJnr2LUXTWfBBKZU-F6Q3K3kKNu8w'
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
