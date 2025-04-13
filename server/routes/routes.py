# routes/routes.py

from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from models.models import db, User, Career

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
@jwt_required()
def user_registration():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role.lower() != 'admin':
        return jsonify({'message': '❌ Access denied. Only admins can register new users!'}), 403

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists!'}), 400

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

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password, role='admin')
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': '✅ Admin user created successfully!'}), 201

#Login route
@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': '❌ Invalid credentials'}), 401

    # ✅ Store user.id as JWT identity
    access_token = create_access_token(identity=user.id)

    return jsonify({
        'access_token': access_token,
        'message': '✅ Login successful',
        'user': {
            'email': user.email,
            'role': user.role
        }
    }), 200



@routes.route('/careers/create', methods=['POST'])
@jwt_required()
def create_career():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # ✅ Ensure only admin can post career notices
    if not user or user.role.lower() != 'admin':
        return jsonify({'message': '❌ Access denied. Only admins can post career notices!'}), 403

    data = request.get_json()

    # ✅ Extract fields using model's column names
    job_title = data.get('JobTitle')
    job_description = data.get('JobDescription')
    requirements = data.get('Requirements')
    job_type = data.get('JobType')
    deadline = data.get('Deadline')  # Should be in YYYY-MM-DD
    application_instructions = data.get('ApplicationInstructions')
    is_active_id = data.get('IsActiveID')  # 1 or 2

    # 🛑 Validate required fields
    if not job_title or not job_description or not deadline or not is_active_id:
        return jsonify({'message': '❌ Required fields: JobTitle, JobDescription, Deadline, IsActiveID'}), 400

    try:
        # ⏳ Parse deadline
        deadline_date = datetime.strptime(deadline, "%Y-%m-%d").date()

        # 💾 Create Career instance
        new_career = Career(
            JobTitle=job_title,
            JobDescription=job_description,
            Requirements=requirements,
            JobType=job_type,
            Deadline=deadline_date,
            ApplicationInstructions=application_instructions,
            IsActiveID=is_active_id
        )

        db.session.add(new_career)
        db.session.commit()

        return jsonify({'message': '✅ Career notice posted successfully!'}), 201

    except Exception as e:
        return jsonify({'message': '❌ Failed to post career', 'error': str(e)}), 500
