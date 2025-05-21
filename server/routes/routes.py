from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from models.models import db, User, Career, CoreValue,Resource,FAQ, Feedback, MobileBankingInfo, OperationTimeline,Partnership, Post,  Product, SaccoBranch, SaccoProfile, Service, SaccoClient, SaccoStatistics,  HomepageSlider, Membership, BOD, Management
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


#Route for viewing career posts
# ✅ Public route to view all active career posts
@routes.route('/careers', methods=['GET'])
def view_careers():
    try:
        careers = Career.query.filter_by(IsActiveID=1).all()  # Only show active posts
        if not careers:
            return jsonify({'message': 'ℹ️ No active career posts found.'}), 404

        career_list = []
        for career in careers:
            career_data = {
                'CareerID': career.CareerID,
                'JobTitle': career.JobTitle,
                'JobDescription': career.JobDescription,
                'Requirements': career.Requirements,
                'JobType': career.JobType,
                'Deadline': career.Deadline.strftime("%Y-%m-%d") if career.Deadline else None,
                'ApplicationInstructions': career.ApplicationInstructions
            }
            career_list.append(career_data)

        return jsonify({'careers': career_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ An error occurred while fetching career posts.', 'error': str(e)}), 500


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
    

#Route for viewing the core_values 
# ✅ Public route to view all active core values
@routes.route('/corevalues', methods=['GET'])
def view_core_values():
    try:
        core_values = CoreValue.query.filter_by(IsActiveID=1).all()  # Only show active core values
        if not core_values:
            return jsonify({'message': 'ℹ️ No active core values found.'}), 404

        values_list = []
        for value in core_values:
            value_data = {
                'CoreValueID': value.CoreValueID,
                'CoreValueName': value.CoreValueName,
                'Description': value.Description
            }
            values_list.append(value_data)

        return jsonify({'core_values': values_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ An error occurred while fetching core values.', 'error': str(e)}), 500

    
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

        # Extract file extension
        filename = file.filename
        extension = filename.split('.')[-1]

        # Upload to Cloudinary as raw file type
        upload_result = cloudinary.uploader.upload(file, resource_type='raw')

        # Defensive: check if secure_url exists
        if 'public_id' not in upload_result or 'version' not in upload_result:
            return jsonify({'message': '❌ Upload failed.', 'cloudinary_response': upload_result}), 500

        public_id = upload_result['public_id']
        version = upload_result['version']

        # Force download link (fl_attachment adds download prompt)
        file_url = f"https://res.cloudinary.com/djydkcx01/raw/upload/fl_attachment:{public_id}/v{version}/{public_id}.{extension}"

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

#Route for viewing a post details
@routes.route('/posts/<int:post_id>', methods=['GET'])
def get_single_post(post_id):
    try:
        post = Post.query.get(post_id)
        if not post:
            return jsonify({'message': '❌ Post not found.'}), 404

        post_data = {
            'PostID': post.PostID,
            'Title': post.Title,
            'Content': post.Content,
            'CoverImage': post.CoverImage,
            'DatePosted': post.DatePosted.strftime('%Y-%m-%d %H:%M:%S')
        }

        return jsonify({'post': post_data}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to retrieve post.', 'error': str(e)}), 500


#Route for creating the products offered by a sacco
@routes.route('/products/create', methods=['POST'])
@jwt_required()
def create_product():
    try:
        # Authenticate user
        current_user = get_jwt_identity()
        role = current_user['role']

        if role.lower() != 'admin':
            return jsonify({'message': '❌ Unauthorized. Admins only.'}), 403

        # Extract JSON data
        data = request.get_json()
        product_name = data.get('ProductName')
        description = data.get('Description')
        image_url = data.get('ImageURL')

        # Validate required fields
        if not product_name or not description or not image_url:
            return jsonify({'message': '❌ ProductName, Description, and ImageURL are required!'}), 400

        # Create new product entry
        new_product = Product(
            ProductName=product_name,
            Description=description,
            ImageURL=image_url
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify({'message': '✅ Product created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create product.', 'error': str(e)}), 500

#View products 
@routes.route('/products', methods=['GET'])
def view_products():
    try:
        # Fetch all products ordered by newest first
        products = Product.query.order_by(Product.CreatedAt.desc()).all()

        # Prepare list to return
        product_list = []
        for product in products:
            product_list.append({
                'ProductID': product.ProductID,
                'ProductName': product.ProductName,
                'Description': product.Description,
                'ImageURL': product.ImageURL,
                'CreatedAt': product.CreatedAt.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify({'products': product_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch products.', 'error': str(e)}), 500


#Viewing a particular product
@routes.route('/products/<int:product_id>', methods=['GET'])
def view_product(product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'message': '❌ Product not found!'}), 404

        product_data = {
            'ProductID': product.ProductID,
            'ProductName': product.ProductName,
            'Description': product.Description,
            'ImageURL': product.ImageURL,
            'CreatedAt': product.CreatedAt.strftime('%Y-%m-%d %H:%M:%S')
        }

        return jsonify({'product': product_data}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch product.', 'error': str(e)}), 500


#Route for creating a sacco branch 
@routes.route('/branches/create', methods=['POST'])
@jwt_required()
def create_branch():
    try:
        current_user = get_jwt_identity()
        role = current_user['role']

        if role.lower() != 'admin':
            return jsonify({'message': '❌ Unauthorized. Admins only.'}), 403

        data = request.get_json()

        branch_name = data.get('BranchName')
        location = data.get('Location')
        contact_number = data.get('ContactNumber')
        google_map_url = data.get('GoogleMapURL')

        # Validate required fields
        if not branch_name or not location:
            return jsonify({'message': '❌ BranchName and Location are required!'}), 400

        new_branch = SaccoBranch(
            BranchName=branch_name,
            Location=location,
            ContactNumber=contact_number,
            GoogleMapURL=google_map_url
        )

        db.session.add(new_branch)
        db.session.commit()

        return jsonify({'message': '✅ Branch created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create branch.', 'error': str(e)}), 500

#Viewing all the branches 
@routes.route('/branches', methods=['GET'])
def view_all_branches():
    try:
        branches = SaccoBranch.query.order_by(SaccoBranch.CreatedAt.desc()).all()
        branch_list = []

        for branch in branches:
            branch_list.append({
                "BranchID": branch.BranchID,
                "BranchName": branch.BranchName,
                "Location": branch.Location,
                "ContactNumber": branch.ContactNumber,
                "GoogleMapURL": branch.GoogleMapURL,
                "CreatedAt": branch.CreatedAt.strftime("%Y-%m-%d %H:%M:%S")
            })

        return jsonify({"branches": branch_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch branches.', 'error': str(e)}), 500


#Creating a sacco profile
@routes.route('/sacco-profile/create', methods=['POST'])
@jwt_required()
def create_sacco_profile():
    try:
        current_user = get_jwt_identity()
        role = current_user['role']

        if role != 'admin':
            return jsonify({'message': '❌ Unauthorized. Admins only.'}), 403

        data = request.get_json()

        required_fields = ['SaccoName', 'LogoURL', 'Slogan', 'PhysicalAddress', 'ContactNumber', 
                           'FacebookURL', 'TwitterURL', 'InstagramURL', 'LinkedInURL', 
                           'SaccoHistory', 'MissionStatement', 'VisionStatement']
        
        # Check for missing required fields
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return jsonify({'message': '❌ Missing required fields.', 'missing_fields': missing_fields}), 400

        profile = SaccoProfile(
            SaccoName=data['SaccoName'],
            LogoURL=data['LogoURL'],
            Slogan=data['Slogan'],
            PhysicalAddress=data['PhysicalAddress'],
            ContactNumber=data['ContactNumber'],
            FacebookURL=data['FacebookURL'],
            TwitterURL=data['TwitterURL'],
            InstagramURL=data['InstagramURL'],
            LinkedInURL=data['LinkedInURL'],
            SaccoHistory=data['SaccoHistory'],
            MissionStatement=data['MissionStatement'],
            VisionStatement=data['VisionStatement']
        )

        db.session.add(profile)
        db.session.commit()

        return jsonify({'message': '✅ SACCO profile created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create SACCO profile.', 'error': str(e)}), 500

#Viewing Sacco_Profile
@routes.route('/sacco-profile', methods=['GET'])
def view_sacco_profile():
    try:
        # Get the most recent SACCO profile (or the first one if only one exists)
        sacco_profile = SaccoProfile.query.order_by(SaccoProfile.SaccoID.desc()).first()

        if not sacco_profile:
            return jsonify({'message': '❌ No SACCO profile found.'}), 404

        profile_data = {
            "SaccoName": sacco_profile.SaccoName,
            "LogoURL": sacco_profile.LogoURL,
            "Slogan": sacco_profile.Slogan,
            "PhysicalAddress": sacco_profile.PhysicalAddress,
            "ContactNumber": sacco_profile.ContactNumber,
            "FacebookURL": sacco_profile.FacebookURL,
            "TwitterURL": sacco_profile.TwitterURL,
            "InstagramURL": sacco_profile.InstagramURL,
            "LinkedInURL": sacco_profile.LinkedInURL,
            "SaccoHistory": sacco_profile.SaccoHistory,
            "MissionStatement": sacco_profile.MissionStatement,
            "VisionStatement": sacco_profile.VisionStatement,
           
        }

        return jsonify(profile_data), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch SACCO profile.', 'error': str(e)}), 500


#Create a service
@routes.route('/services/create', methods=['POST'])
@jwt_required()
def create_service():
    try:
        current_user = get_jwt_identity()
        role = current_user['role']

        if role.lower() != 'admin':
            return jsonify({'message': '❌ Unauthorized. Admins only.'}), 403

        # Accept either form-data or JSON
        service_name = request.form.get('ServiceName') or request.json.get('ServiceName')
        description = request.form.get('Description') or request.json.get('Description')
        image_file = request.files.get('ImageFile')  # if uploaded
        image_url = request.form.get('ImageURL') or request.json.get('ImageURL')  # if directly linked

        if not service_name or not description:
            return jsonify({'message': '❌ ServiceName and Description are required!'}), 400

        if not image_file and not image_url:
            return jsonify({'message': '❌ Either ImageFile or ImageURL must be provided!'}), 400

        # Upload file to cloudinary if it's sent
        if image_file:
            upload_result = cloudinary.uploader.upload(image_file)
            final_image_url = upload_result['secure_url']
        else:
            final_image_url = image_url

        new_service = Service(
            ServiceName=service_name,
            Description=description,
            ImageURL=final_image_url
        )

        db.session.add(new_service)
        db.session.commit()

        return jsonify({'message': '✅ Service created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create service.', 'error': str(e)}), 500
    
# Route for viewing the services offered by the SACCO
@routes.route('/services', methods=['GET'])
def view_services():
    try:
        services = Service.query.order_by(Service.CreatedAt.desc()).all()
        
        service_list = []
        for svc in services:
            service_list.append({
                'ServiceID': svc.ServiceID,
                'ServiceName': svc.ServiceName,
                'ImageURL': svc.ImageURL,
                'Description': svc.Description,
                'ServiceCategory': svc.ServiceCategory,
                'LoanFormURL': svc.LoanFormURL,
                'CreatedAt': svc.CreatedAt.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify({'services': service_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch services.', 'error': str(e)}), 500

#Creating sacco clients 
@routes.route('/clients/create', methods=['POST'])
@jwt_required()
def create_client():
    try:
        current_user = get_jwt_identity()
        if current_user['role'].lower() != 'admin':
            return jsonify({'message': '❌ Unauthorized. Admins only.'}), 403

        data = request.get_json()

        client_name = data.get('ClientName')
        client_statistic = data.get('ClientStatistic')
        logo_url = data.get('LogoURL')
        is_active_id = data.get('IsActiveID')

        # Validate required fields
        if not all([client_name, logo_url, is_active_id]):
            missing_fields = []
            if not client_name:
                missing_fields.append("ClientName")
            if not logo_url:
                missing_fields.append("LogoURL")
            if not is_active_id:
                missing_fields.append("IsActiveID")
            return jsonify({'message': '❌ Missing required fields.', 'missing_fields': missing_fields}), 400

        new_client = SaccoClient(
            ClientName=client_name,
            ClientStatistic=client_statistic,
            LogoURL=logo_url,
            IsActiveID=is_active_id
        )

        db.session.add(new_client)
        db.session.commit()

        return jsonify({'message': '✅ SACCO client created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create SACCO client.', 'error': str(e)}), 500

#Route for viewing the SACCO Clients
@routes.route('/clients', methods=['GET'])
def get_clients():
    try:
        # Get only active clients (IsActiveID = 1)
        clients = SaccoClient.query.filter_by(IsActiveID=1).order_by(SaccoClient.CreatedAt.desc()).all()

        client_list = []
        for client in clients:
            client_list.append({
                'ClientID': client.ClientID,
                'ClientName': client.ClientName,
                'ClientStatistic': client.ClientStatistic,
                'LogoURL': client.LogoURL,
                'CreatedAt': client.CreatedAt.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify({'clients': client_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch SACCO clients.', 'error': str(e)}), 500

#Route for creating a sacco statistics 
@routes.route('/statistics/create', methods=['POST'])
@jwt_required()
def create_statistics():
    try:
        current_user = get_jwt_identity()
        if current_user['role'].lower() != 'admin':
            return jsonify({'message': '❌ Unauthorized. Admins only.'}), 403

        data = request.get_json()

        active_members = data.get('ActiveMembers')
        mobile_banking_users = data.get('MobileBankingUsers')
        branch_count = data.get('BranchCount')
        years_of_service = data.get('YearsOfService')

        if active_members is None:
            return jsonify({'message': '❌ ActiveMembers is required.'}), 400

        new_stats = SaccoStatistics(
            ActiveMembers=active_members,
            MobileBankingUsers=mobile_banking_users,
            BranchCount=branch_count,
            YearsOfService=years_of_service
        )

        db.session.add(new_stats)
        db.session.commit()

        return jsonify({'message': '✅ SACCO statistics created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to create SACCO statistics.', 'error': str(e)}), 500


#Route for viewing the Statistics
@routes.route('/statistics', methods=['GET'])
def get_latest_statistics():
    try:
        # Get the most recently created statistics entry
        latest_stats = SaccoStatistics.query.order_by(SaccoStatistics.LastUpdated.desc()).first()

        if not latest_stats:
            return jsonify({'message': 'ℹ️ No statistics found.'}), 404

        stats_data = {
            'ActiveMembers': latest_stats.ActiveMembers,
            'MobileBankingUsers': latest_stats.MobileBankingUsers,
            'BranchCount': latest_stats.BranchCount,
            'YearsOfService': latest_stats.YearsOfService,
            'LastUpdated': latest_stats.LastUpdated.strftime('%Y-%m-%d %H:%M:%S')
        }

        return jsonify({'statistics': stats_data}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch statistics.', 'error': str(e)}), 500

#Creating Homepage slides
@routes.route('/slider/create', methods=['POST'])
@jwt_required()
def create_homepage_slider():
    try:
        # ✅ Authenticate admin
        current_user = get_jwt_identity()
        if current_user['role'].lower() != 'admin':
            return jsonify({'message': '❌ Unauthorized. Admins only!'}), 403

        # ✅ Get data from request
        data = request.get_json()
        title = data.get('Title')
        description = data.get('Description')
        image_path = data.get('ImagePath')  # Cloudinary URL
        is_active_id = data.get('IsActiveID')

        # ✅ Validate required fields
        if not title or not image_path or not is_active_id:
            return jsonify({
                'message': '❌ Title, ImagePath, and IsActiveID are required!'
            }), 400

        # ✅ Create and save slider
        new_slider = HomepageSlider(
            Title=title,
            Description=description,
            ImagePath=image_path,
            IsActiveID=is_active_id
        )
        db.session.add(new_slider)
        db.session.commit()

        return jsonify({'message': '✅ Slider image created successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'message': '❌ Failed to create homepage slider.',
            'error': str(e)
        }), 500


#Viewing homepage sliders
@routes.route('/slider/view', methods=['GET'])
def view_homepage_sliders():
    try:
        # Fetch only active sliders (IsActiveID = 1)
        sliders = HomepageSlider.query.filter_by(IsActiveID=1).order_by(HomepageSlider.Timestamp.desc()).all()

        slider_list = []
        for slide in sliders:
            slider_list.append({
                'Title': slide.Title,
                'Description': slide.Description,
                'ImagePath': slide.ImagePath,
                'Timestamp': slide.Timestamp.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify({'sliders': slider_list}), 200

    except Exception as e:
        return jsonify({'message': '❌ Failed to fetch sliders.', 'error': str(e)}), 500
    
#Customer Registration
@routes.route('/membership/register', methods=['POST'])
def register_member():
    try:
        # Get form data and files
        full_name = request.form.get('FullName')
        id_type = request.form.get('IDType')
        id_number = request.form.get('IDNumber')
        dob_str = request.form.get('DOB')
        marital_status = request.form.get('MaritalStatus')
        gender = request.form.get('Gender')
        address = request.form.get('Address')
        telephone = request.form.get('Telephone')
        alt_phone = request.form.get('AlternatePhone')
        kra_pin = request.form.get('KRAPin')
        county = request.form.get('County')
        sub_county = request.form.get('SubCounty')
        email = request.form.get('Email')
        contact_person = request.form.get('ContactPerson')
        contact_phone = request.form.get('ContactPersonPhone')
        nominee_name = request.form.get('NomineeName')
        nominee_id = request.form.get('NomineeID')
        nominee_contact = request.form.get('NomineeContact')
        nominee_relation = request.form.get('NomineeRelation')

        # Required uploads
        id_back_file = request.files.get('IDBackURL')
        id_front_file = request.files.get('IDFrontURL')
        signature_file = request.files.get('SignatureURL')
        passport_file = request.files.get('PASSPORTURL')

        if not all([id_back_file, id_front_file, signature_file, passport_file]):
            return jsonify({'message': '❌ All ID, signature, and passport files are required.'}), 400

        # Parse date of birth
        try:
            dob = datetime.strptime(dob_str, '%Y-%m-%d').date()
        except Exception:
            return jsonify({'message': '❌ DOB must be in YYYY-MM-DD format'}), 400

        # Upload files to Cloudinary
        id_back_url = cloudinary.uploader.upload(id_back_file)['secure_url']
        id_front_url = cloudinary.uploader.upload(id_front_file)['secure_url']
        signature_url = cloudinary.uploader.upload(signature_file)['secure_url']
        passport_url = cloudinary.uploader.upload(passport_file)['secure_url']

        # Save to database
        new_member = Membership(
            FullName=full_name,
            IDType=id_type,
            IDNumber=id_number,
            DOB=dob,
            MaritalStatus=marital_status,
            Gender=gender,
            Address=address,
            Telephone=telephone,
            AlternatePhone=alt_phone,
            KRAPin=kra_pin,
            County=county,
            SubCounty=sub_county,
            Email=email,
            ContactPerson=contact_person,
            ContactPersonPhone=contact_phone,
            NomineeName=nominee_name,
            NomineeID=nominee_id,
            NomineeContact=nominee_contact,
            NomineeRelation=nominee_relation,
            IDBackURL=id_back_url,
            IDFrontURL=id_front_url,
            SignatureURL=signature_url,
            PASSPORTURL=passport_url
        )

        db.session.add(new_member)
        db.session.commit()

        return jsonify({'message': '✅ Member registered successfully!'}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Registration failed.', 'error': str(e)}), 500

#Viewing the list of registered members
@routes.route('/admin/members', methods=['GET'])
@jwt_required()
def view_registered_members():
    try:
        current_user = get_jwt_identity()
        if current_user['role'].lower() != 'admin':
            return jsonify({'message': '❌ Access denied. Admins only!'}), 403

        members = Membership.query.order_by(Membership.RegisteredAt.desc()).all()
        member_list = []

        for member in members:
            member_list.append({
                'MemberID': member.MemberID,
                'FullName': member.FullName,
                'IDType': member.IDType,
                'IDNumber': member.IDNumber,
                'DOB': member.DOB.strftime('%Y-%m-%d'),
                'Telephone': member.Telephone,
                'Email': member.Email,
                'County': member.County,
                'SubCounty': member.SubCounty,
                'RegisteredAt': member.RegisteredAt.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify({'members': member_list}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': '❌ Failed to fetch members.', 'error': str(e)}), 500


#Viewing the BOD Members
@routes.route('/bod/view', methods=['GET'])
def view_bod():
    bod_list = BOD.query.all()
    result = [
        {
            "BODID": member.BODID,
            "Name": member.Name,
            "Designation": member.Designation,
            "ImageURL": member.ImageURL
        }
        for member in bod_list
    ]
    return jsonify(result), 200

#VIEW MANAGEMENT TEAM
@routes.route('/management/view', methods=['GET'])
def view_management():
    management_list = Management.query.all()
    result = [
        {
            "MGTID": member.MGTID,
            "MGTName": member.MGTName,
            "Designation": member.Designation,
            "ImageURL": member.ImageURL
        }
        for member in management_list
    ]
    return jsonify(result), 200
