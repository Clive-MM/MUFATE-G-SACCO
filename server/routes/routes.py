from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from models.models import db, User, Career, CoreValue,Resource,FAQ, Feedback, MobileBankingInfo, OperationTimeline,Partnership, Post
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


# ✅ Admin-only route to create FAQ
@routes.route('/faqs/create', methods=['POST'])
@jwt_required()
def create_faq():
    try:
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']
        role = current_user['role']

        if role.lower() != 'admin':
            return jsonify({'message': '❌ Access denied. Only admins can add FAQs!'}), 403

        data = request.get_json()
        question = data.get('Question')
        answer = data.get('Answer')
        is_active_id = data.get('IsActiveID')

        if not all([question, answer, is_active_id]):
            return jsonify({'message': '❌ Missing required fields: Question, Answer, IsActiveID'}), 400

        new_faq = FAQ(
            Question=question,
            Answer=answer,
            IsActiveID=is_active_id
        )
        db.session.add(new_faq)
        db.session.commit()

        return jsonify({'message': '✅ FAQ created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create FAQ', 'error': str(e)}), 500
    
# ✅ Public route to view FAQs
@routes.route('/faqs', methods=['GET'])
def list_faqs():
    try:
        # Fetch FAQs where IsActiveID = 1 (Active)
        faqs = FAQ.query.filter_by(IsActiveID=1).order_by(FAQ.CreatedDate.desc()).all()

        faq_list = []
        for faq in faqs:
            faq_list.append({
                'FAQID': faq.FAQID,
                'Question': faq.Question,
                'Answer': faq.Answer,
                'CreatedDate': faq.CreatedDate.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify({'faqs': faq_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch FAQs.', 'error': str(e)}), 500

# ✅ Public route to submit feedback
@routes.route('/feedback', methods=['POST'])
def submit_feedback():
    try:
        data = request.get_json()

        email = data.get('Email')
        subject = data.get('Subject')
        message = data.get('Message')

        #  Validate basic fields
        if not email or not subject or not message:
            return jsonify({'message': '❌ Email, Subject, and Message are required!'}), 400

        # Insert feedback into the database
        new_feedback = Feedback(
            Email=email,
            Subject=subject,
            Message=message,
            StatusID=1  # 1 for 'Unread' status (default when someone submits feedback)
        )

        db.session.add(new_feedback)
        db.session.commit()

        return jsonify({'message': '✅ Thank you for your feedback!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to submit feedback.', 'error': str(e)}), 500
    
#Route for viewing the feedbacks for the admin only   
@routes.route('/admin/feedbacks', methods=['GET'])
@jwt_required()
def get_all_feedbacks():
    current_user = get_jwt_identity()
    if current_user['role'].lower() != 'admin':
        return jsonify({'message': '❌ Access denied. Admins only!'}), 403

    feedbacks = Feedback.query.order_by(Feedback.SubmittedAt.desc()).all()
    results = []

    for fb in feedbacks:
        results.append({
            'FeedbackID': fb.FeedbackID,
            'Email': fb.Email,
            'Subject': fb.Subject,
            'Message': fb.Message,
            'Status': fb.status.StatusName if fb.status else 'Unknown',
            'SubmittedAt': fb.SubmittedAt.strftime('%Y-%m-%d %H:%M:%S')
        })

    return jsonify({'feedbacks': results}), 200


#Admin creating a route for creating mobile banking details 
@routes.route('/mobile-banking/create', methods=['POST'])
@jwt_required()
def create_mobile_banking_info():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user['user_id'])

        if not user or user.role.lower() != 'admin':
            return jsonify({'message': '❌ Only admins can add mobile banking info!'}), 403

        data = request.get_json()

        ussd_code = data.get('USSDCode')
        paybill_number = data.get('PaybillNumber')
        description = data.get('Description')
        is_active_id = data.get('IsActiveID')

        # Validation
        if not ussd_code or not is_active_id:
            return jsonify({
                'message': '❌ USSDCode and IsActiveID are required!'
            }), 400

        new_entry = MobileBankingInfo(
            USSDCode=ussd_code,
            PaybillNumber=paybill_number,
            Description=description,
            IsActiveID=is_active_id
        )

        db.session.add(new_entry)
        db.session.commit()

        return jsonify({'message': '✅ Mobile Banking Info created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create mobile banking info.', 'error': str(e)}), 500


#Route for viewing mobile banking information
@routes.route('/mobile-banking', methods=['GET'])
def view_mobile_banking_info():
    try:
        # Only fetch active entries (IsActiveID = 1)
        entries = MobileBankingInfo.query.filter_by(IsActiveID=1).order_by(MobileBankingInfo.CreatedAt.desc()).all()

        results = []
        for entry in entries:
            results.append({
                'MobileBankingID': entry.MobileBankingID,
                'USSDCode': entry.USSDCode,
                'PaybillNumber': entry.PaybillNumber,
                'Description': entry.Description,
                'CreatedAt': entry.CreatedAt.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify({'mobile_banking_info': results}), 200

    except Exception as e:
        return jsonify({'message': '❌ Failed to fetch mobile banking info.', 'error': str(e)}), 500

#route for creating the operational hours 
@routes.route('/operation-hours/create', methods=['POST'])
@jwt_required()
def create_operation_hours():
    try:
        current_user = get_jwt_identity()
        if current_user['role'].lower() != 'admin':
            return jsonify({'message': '❌ Only admins can create operation timelines!'}), 403

        data = request.get_json()
        day_of_week = data.get('DayOfWeek')
        opening_time_str = data.get('OpeningTime')
        closing_time_str = data.get('ClosingTime')

        if not all([day_of_week, opening_time_str, closing_time_str]):
            return jsonify({'message': '❌ All fields (DayOfWeek, OpeningTime, ClosingTime) are required!'}), 400

        # Parse time strings to time objects
        try:
            opening_time = datetime.strptime(opening_time_str, "%H:%M").time()
            closing_time = datetime.strptime(closing_time_str, "%H:%M").time()
        except ValueError:
            return jsonify({'message': '❌ Time must be in HH:MM format.'}), 400

        new_timeline = OperationTimeline(
            DayOfWeek=day_of_week,
            OpeningTime=opening_time,
            ClosingTime=closing_time
        )

        db.session.add(new_timeline)
        db.session.commit()

        return jsonify({'message': '✅ Operation hours created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create operation hours', 'error': str(e)}), 500


#View operational Hours
@routes.route('/operation-hours', methods=['GET'])
def get_operation_hours():
    try:
        timelines = OperationTimeline.query.order_by(OperationTimeline.CreatedAt.asc()).all()

        hours_list = []
        for timeline in timelines:
            hours_list.append({
                'DayOfWeek': timeline.DayOfWeek,
                'OpeningTime': timeline.OpeningTime.strftime('%H:%M'),
                'ClosingTime': timeline.ClosingTime.strftime('%H:%M')
            })

        return jsonify({'operation_hours': hours_list}), 200

    except Exception as e:
        return jsonify({'message': '❌ Failed to fetch operation hours.', 'error': str(e)}), 500


#Creating partners linking with the sacco
@routes.route('/partnerships/create', methods=['POST'])
@jwt_required()
def create_partnership():
    try:
        current_user = get_jwt_identity()
        role = current_user['role']

        # ✅ Ensure only admins can create partnerships
        if role.lower() != 'admin':
            return jsonify({'message': '❌ Access denied. Only admins can create partnerships.'}), 403

        data = request.get_json()
        if not data:
            return jsonify({'message': '❌ Request body must be valid JSON.'}), 400

        partner_name = data.get('PartnerName')
        description = data.get('Description')
        logo_url = data.get('LogoImageURL')
        is_active_id = data.get('IsActiveID')

        # ✅ Check required fields
        missing_fields = []
        if not partner_name:
            missing_fields.append('PartnerName')
        if not logo_url:
            missing_fields.append('LogoImageURL')
        if not is_active_id:
            missing_fields.append('IsActiveID')

        if missing_fields:
            return jsonify({'message': f"❌ Missing required fields: {', '.join(missing_fields)}"}), 400

        # ✅ Create and save the partnership
        new_partner = Partnership(
            PartnerName=partner_name,
            Description=description,
            LogoImageURL=logo_url,
            IsActiveID=is_active_id
        )

        db.session.add(new_partner)
        db.session.commit()

        return jsonify({'message': '✅ Partnership created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create partnership', 'error': str(e)}), 500


#Route for fetching active partners
@routes.route('/partnerships', methods=['GET'])
def get_partnerships():
    try:
        # Fetch partnerships that are marked as active (IsActiveID = 1)
        partnerships = Partnership.query.filter_by(IsActiveID=1).order_by(Partnership.CreatedAt.desc()).all()

        partner_list = []
        for partner in partnerships:
            partner_list.append({
                'PartnerID': partner.PartnerID,
                'PartnerName': partner.PartnerName,
                'Description': partner.Description,
                'LogoImageURL': partner.LogoImageURL,
                'CreatedAt': partner.CreatedAt.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify({'partnerships': partner_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch partnerships.', 'error': str(e)}), 500


#Route creating a post
@routes.route('/posts/create', methods=['POST'])
@jwt_required()
def create_post():
    try:
        # Authenticate user
        current_user = get_jwt_identity()
        role = current_user['role']

        if role.lower() != 'admin':
            return jsonify({'message': '❌ Unauthorized. Admins only.'}), 403

        # Extract form data
        title = request.json.get('Title')
        content = request.json.get('Content')
        cover_image_url = request.json.get('CoverImage')

        # Validate input
        if not title or not content or not cover_image_url:
            return jsonify({'message': '❌ Title, Content, and CoverImage URL are required!'}), 400

        # Create and save new post
        new_post = Post(
            Title=title,
            Content=content,
            CoverImage=cover_image_url
        )

        db.session.add(new_post)
        db.session.commit()

        return jsonify({'message': '✅ Post created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create post.', 'error': str(e)}), 500

#viewing posts 
@routes.route('/posts', methods=['GET'])
def get_all_posts():
    try:
        posts = Post.query.order_by(Post.DatePosted.desc()).all()
        post_list = []

        for post in posts:
            post_list.append({
                'PostID': post.PostID,
                'Title': post.Title,
                'Content': post.Content,
                'CoverImage': post.CoverImage,
                'DatePosted': post.DatePosted.strftime("%Y-%m-%d %H:%M:%S")
            })

        return jsonify({'posts': post_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch posts.', 'error': str(e)}), 500
