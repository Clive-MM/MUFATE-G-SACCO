from flask import Flask
from models.models import db  

app = Flask(__name__)

# Correct, readable connection string 
app.config['SQLALCHEMY_DATABASE_URI'] = (
    "mssql+pyodbc://@localhost,1433/MUFATE_G_SACCO"
    "?driver=ODBC+Driver+17+for+SQL+Server&Trusted_Connection=yes"
)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db.init_app(app)

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
