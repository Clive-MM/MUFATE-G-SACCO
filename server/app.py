from flask import Flask
from models.models import db, IsActive, FeedbackStatus  # Make sure to import here

app = Flask(__name__)

# Correct, readable connection string
app.config['SQLALCHEMY_DATABASE_URI'] = (
    "mssql+pyodbc://@localhost,1433/MUFATE_G_SACCO"
    "?driver=ODBC+Driver+17+for+SQL+Server&Trusted_Connection=yes"
)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db.init_app(app)

# Create tables and seed data
with app.app_context():
    db.create_all()
    print("✅ Tables created successfully from models.py")

    # 🌱 Seed default data for IsActive and FeedbackStatus
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

# Test DB connection
with app.app_context():
    try:
        db.engine.connect()
        print("✅ Connection to MUFATE_G_SACCO was successful!")
    except Exception as e:
        print("❌ Failed to connect to SQL Server:", e)

@app.route('/')
def index():
    return "Hello MUFATE G SACCO"

if __name__ == "__main__":
    app.run(debug=True)
