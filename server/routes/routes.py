from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from models.models import db, User, Career, CoreValue,Resource
import cloudinary.uploader

routes = Blueprint('routes', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()

# ✅ Test route
@routes.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Test route working successfully!"}), 200

# ✅ Login route
@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': '❌ Invalid credentials'}), 401

    # Store both user_id and role in the JWT
    access_token = create_access_token(identity={
        'user_id': user.id,
        'role': user.role
    })

    return jsonify({
        'access_token': access_token,
        'message': '✅ Login successful',
        'user': {
            'email': user.email,
            'role': user.role
        }
    }), 200

# ✅ Admin-only Career creation route
@routes.route('/careers/create', methods=['POST'])
@jwt_required()
def create_career():
    try:
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']
        role = current_user['role']

        if role != 'admin':
            return jsonify({'message': '❌ Unauthorized access!'}), 403

        data = request.get_json()
        job_title = data.get('JobTitle')
        job_description = data.get('JobDescription')
        requirements = data.get('Requirements')
        job_type = data.get('JobType')
        deadline_str = data.get('Deadline')
        application_instructions = data.get('ApplicationInstructions')
        is_active_id = data.get('IsActiveID')

        if not all([job_title, job_description, deadline_str, is_active_id]):
            return jsonify({'message': '❌ Missing required fields'}), 400

        deadline = datetime.strptime(deadline_str, "%Y-%m-%d").date()

        new_career = Career(
            JobTitle=job_title,
            JobDescription=job_description,
            Requirements=requirements,
            JobType=job_type,
            Deadline=deadline,
            ApplicationInstructions=application_instructions,
            IsActiveID=is_active_id
        )

        db.session.add(new_career)
        db.session.commit()

        return jsonify({'message': '✅ Career posted successfully'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ An error occurred.', 'error': str(e)}), 500
    
# ✅Admin updating a career post    
@routes.route('/careers/update/<int:career_id>', methods=['PUT'])
@jwt_required()
def update_career(career_id):
    try:
        # Authenticate and authorize
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']
        role = current_user['role']

        if role != 'admin':
            return jsonify({'message': '❌ Unauthorized access!'}), 403

        # Find the career post by ID
        career = Career.query.get(career_id)
        if not career:
            return jsonify({'message': '❌ Career post not found!'}), 404

        # Get updated fields from request
        data = request.get_json()
        job_title = data.get('JobTitle')
        job_description = data.get('JobDescription')
        requirements = data.get('Requirements')
        job_type = data.get('JobType')
        deadline_str = data.get('Deadline')
        application_instructions = data.get('ApplicationInstructions')
        is_active_id = data.get('IsActiveID')

        # Update fields only if they are provided
        if job_title:
            career.JobTitle = job_title
        if job_description:
            career.JobDescription = job_description
        if requirements:
            career.Requirements = requirements
        if job_type:
            career.JobType = job_type
        if deadline_str:
            try:
                career.Deadline = datetime.strptime(deadline_str, "%Y-%m-%d").date()
            except ValueError:
                return jsonify({'message': '❌ Deadline must be in YYYY-MM-DD format.'}), 400
        if application_instructions:
            career.ApplicationInstructions = application_instructions
        if is_active_id:
            career.IsActiveID = is_active_id

        # Save updates
        db.session.commit()

        return jsonify({'message': '✅ Career post updated successfully!'}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ An error occurred while updating career.', 'error': str(e)}), 500


# ✅ Admin-only Core Value creation route
@routes.route('/corevalues/create', methods=['POST'])
@jwt_required()
def create_core_value():
    try:
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']
        role = current_user['role']

        if role != 'admin':
            return jsonify({'message': '❌ Access denied. Only admins can create core values!'}), 403

        data = request.get_json()
        if not data:
            return jsonify({'message': '❌ Request body must be valid JSON.'}), 400

        core_value_name = data.get('CoreValueName')
        description = data.get('Description')
        is_active_id = data.get('IsActiveID')

        if not core_value_name or not is_active_id:
            return jsonify({'message': '❌ CoreValueName and IsActiveID are required!'}), 400

        new_value = CoreValue(
            CoreValueName=core_value_name,
            Description=description,
            IsActiveID=is_active_id
        )
        db.session.add(new_value)
        db.session.commit()

        return jsonify({'message': '✅ Core value created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create core value', 'error': str(e)}), 500
    
#upload image urls
@routes.route('/upload_image', methods=['POST'])
@jwt_required()
def upload_image():
    try:
        file = request.files['image']  
        upload_result = cloudinary.uploader.upload(file)
        image_url = upload_result['secure_url']

        return jsonify({
            'message': '✅ Image uploaded successfully!',
            'image_url': image_url
        }), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to upload image.', 'error': str(e)}), 500
    
#upload a resource.
@routes.route('/resources/upload', methods=['POST'])
@jwt_required()
def upload_resource():
    try:
        current_user = get_jwt_identity()
        if current_user['role'].lower() != 'admin':
            return jsonify({'message': '❌ Access denied! Only admins can upload resources.'}), 403

        title = request.form.get('Title')
        file = request.files.get('file')
        is_active_id = request.form.get('IsActiveID')

        if not title or not file or not is_active_id:
            return jsonify({'message': '❌ Title, file, and IsActiveID are required!'}), 400

        # Upload file to Cloudinary (as raw file type, because it's a PDF or document)
        upload_result = cloudinary.uploader.upload(file, resource_type='raw')
        file_url = upload_result['secure_url']

        # Save to database
        new_resource = Resource(
            Title=title,
            FilePath=file_url,
            IsActiveID=is_active_id
        )
        db.session.add(new_resource)
        db.session.commit()

        return jsonify({'message': '✅ Resource uploaded successfully!', 'file_url': file_url}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to upload resource.', 'error': str(e)}), 500


# Viewing resources with download links
@routes.route('/resources', methods=['GET'])
def list_resources():
    try:
        resources = Resource.query.filter_by(IsActiveID=1).order_by(Resource.UploadedAt.desc()).all()
        resource_list = []

        for res in resources:
            resource_list.append({
                'ResourceID': res.ResourceID,
                'Title': res.Title,
                'UploadedAt': res.UploadedAt.strftime('%Y-%m-%d %H:%M:%S'),
                'DownloadLink': f"http://127.0.0.1:5000/resources/download/{res.ResourceID}"
            })

        return jsonify({'resources': resource_list}), 200

    except Exception as e:
        return jsonify({'message': '❌ Failed to fetch resources.', 'error': str(e)}), 500


#   Downloading resources
@routes.route('/resources/download/<int:resource_id>', methods=['GET'])
def download_resource(resource_id):
    try:
        # Find the resource in the database
        resource = Resource.query.get(resource_id)
        if not resource:
            return jsonify({'message': '❌ Resource not found.'}), 404

        # Get the file URL (it was uploaded to Cloudinary)
        file_url = resource.FilePath

        return jsonify({
            'message': '✅ File ready for download!',
            'file_url': file_url
        }), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ An error occurred.', 'error': str(e)}), 500
