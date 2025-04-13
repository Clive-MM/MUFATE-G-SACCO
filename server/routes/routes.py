# routes/routes.py

from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from models.models import db, User

# Define blueprint
routes = Blueprint('routes', __name__)

# Define extension instances (to be initialized in app.py)
bcrypt = Bcrypt()
jwt = JWTManager()

# ✅ Test route
@routes.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Test route working successfully!"}), 200

# Admin-only user registration route
@routes.route('/register', methods=['POST'])
def user_registration():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if an admin already exists
    existing_admin = User.query.first()
    if existing_admin:
        return jsonify({'message': 'Admin already exists. Registration is closed.'}), 403

    # Password complexity checks
    if len(password) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long!'}), 400
    if not any(char.isupper() for char in password):
        return jsonify({'message': 'Password must contain at least one uppercase letter!'}), 400
    if not any(char.islower() for char in password):
        return jsonify({'message': 'Password must contain at least one lowercase letter!'}), 400
    if not any(char.isdigit() for char in password):
        return jsonify({'message': 'Password must contain at least one digit!'}), 400
    if not any(char in '!@#$%^&*()_+-=[]{}|;:,.<>?/~`' for char in password):
        return jsonify({'message': 'Password must contain at least one special character!'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists!'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password, role='admin')
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': '✅ First admin user created successfully!'}), 201
