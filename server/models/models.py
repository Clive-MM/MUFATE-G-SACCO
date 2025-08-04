from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(30), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)  
    role = db.Column(db.String(20), nullable=False, default='admin')  
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class SaccoProfile(db.Model):
    __tablename__ = 'Sacco_Profile'

    SaccoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    SaccoName = db.Column(db.String(200), nullable=False)
    LogoURL = db.Column(db.String(255))
    Slogan = db.Column(db.String(150))
    PhysicalAddress = db.Column(db.String(200))
    ContactNumber = db.Column(db.String(20))
    FacebookURL = db.Column(db.String(150))
    TwitterURL = db.Column(db.String(150))
    InstagramURL = db.Column(db.String(150))
    LinkedInURL = db.Column(db.String(150))
    SaccoHistory = db.Column(db.String(2000))
    MissionStatement = db.Column(db.String(300))
    VisionStatement = db.Column(db.String(300))

class HomepageSlider(db.Model):
    __tablename__ = 'Homepage_Slider'

    ImageID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Title = db.Column(db.String(150))
    Description = db.Column(db.String(300))
    ImagePath = db.Column(db.String(255))
    Timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    IsActiveID = db.Column(db.Integer, db.ForeignKey('IsActive.ID'))
    is_active = db.relationship('IsActive', backref='homepage_sliders')

class CoreValue(db.Model):
    __tablename__ = 'Core_Values'

    CoreValueID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CoreValueName = db.Column(db.String(100), nullable=False)
    Description = db.Column(db.String(500))
    IsActiveID = db.Column(db.Integer, db.ForeignKey('IsActive.ID'))
    is_active = db.relationship('IsActive', backref='core_values')
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)

class MobileBankingInfo(db.Model):
    __tablename__ = 'Mobile_Banking_Info'

    MobileBankingID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    USSDCode = db.Column(db.String(20), nullable=False)
    PaybillNumber = db.Column(db.String(20))
    Description = db.Column(db.String(200))
    IsActiveID = db.Column(db.Integer, db.ForeignKey('IsActive.ID'))
    is_active = db.relationship('IsActive', backref='mobile_banking')
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)

class SaccoBranch(db.Model):
    __tablename__ = 'Sacco_Branch'

    BranchID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    BranchName = db.Column(db.String(100), nullable=False)
    Location = db.Column(db.String(200), nullable=False)
    ContactNumber = db.Column(db.String(30))
    GoogleMapURL = db.Column(db.String(255))
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)

class OperationTimeline(db.Model):
    __tablename__ = 'Operation_Timeline'

    TimelineID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    DayOfWeek = db.Column(db.String(15), nullable=False)
    OpeningTime = db.Column(db.Time, nullable=False)
    ClosingTime = db.Column(db.Time, nullable=False)
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)

class Product(db.Model):
    __tablename__ = 'Product'

    ProductID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ProductName = db.Column(db.String(100), nullable=False)
    Intro = db.Column(db.String(1000))             
    Features = db.Column(db.String(1000))           
    Benefits = db.Column(db.String(1000))           
    ImageURL = db.Column(db.String(255))
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)

class Service(db.Model):
    __tablename__ = 'Services'

    ServiceID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ServiceName = db.Column(db.String(100), nullable=False)
    ImageURL = db.Column(db.String(255))
    Description = db.Column(db.String(1000))
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)
    ServiceCategory = db.Column(db.String(50))  
    LoanFormURL = db.Column(db.String(255)) 
    Features = db.Column(db.String(1000))    
    Benefits = db.Column(db.String(1000))

class SaccoStatistics(db.Model):
    __tablename__ = 'Sacco_Statistics'

    StatID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ActiveMembers = db.Column(db.Integer, nullable=False)
    MobileBankingUsers = db.Column(db.Integer)
    BranchCount = db.Column(db.Integer)
    YearsOfService = db.Column(db.Integer)
    LastUpdated = db.Column(db.DateTime, default=datetime.utcnow)

class Partnership(db.Model):
    __tablename__ = 'Partnership'

    PartnerID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    PartnerName = db.Column(db.String(150), nullable=False)
    Description = db.Column(db.String(1000))
    LogoImageURL = db.Column(db.String(255))
    IsActiveID = db.Column(db.Integer, db.ForeignKey('IsActive.ID'))
    is_active = db.relationship('IsActive', backref='partnerships')
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)


class Membership(db.Model):
    __tablename__ = 'Membership'

    MemberID = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # ✅ Basic Info
    FullName = db.Column(db.String(150), nullable=False)
    Salutation = db.Column(db.String(10), nullable=False)  

    # ✅ ID Information
    IDType = db.Column(db.Enum("ID Card", "Certificate of Incorp", "Group Registration Certificate", "Passport", name="id_type_enum"), nullable=False)
    IDNumber = db.Column(db.String(50), nullable=False, unique=True)
    KRAPin = db.Column(db.String(20), nullable=True)

    # ✅ Personal Details
    DOB = db.Column(db.Date, nullable=False)
    MaritalStatus = db.Column(db.Enum("Single", "Married", "Divorce", "Separated", name="marital_status_enum"), nullable=False)
    Gender = db.Column(db.Enum("Male", "Female", "Others", name="gender_enum"), nullable=False)

    # ✅ Location Details
    County = db.Column(db.String(100), nullable=False)
    District = db.Column(db.String(100), nullable=False)
    Division = db.Column(db.String(100), nullable=True)
    Address = db.Column(db.String(200), nullable=True)
    PostalCode = db.Column(db.String(20), nullable=True)
    PhysicalAddress = db.Column(db.String(200), nullable=True)

    # ✅ Contact Info
    MobileNumber = db.Column(db.String(20), nullable=False)
    AlternateMobileNumber = db.Column(db.String(20), nullable=False)
    Email = db.Column(db.String(100), nullable=True)

    # ✅ Profession Info
    Profession = db.Column(db.String(100), nullable=True)
    ProfessionSector = db.Column(db.String(100), nullable=True)

    # ✅ Nominee Info
    NomineeName = db.Column(db.String(100), nullable=False)
    NomineeIDNumber = db.Column(db.String(50), nullable=False)
    NomineePhoneNumber = db.Column(db.String(20), nullable=False)
    NomineeRelation = db.Column(db.String(50), nullable=False)

    # ✅ File Uploads
    IDBackURL = db.Column(db.String(255), nullable=False)
    IDFrontURL = db.Column(db.String(255), nullable=False)
    SignatureURL = db.Column(db.String(255), nullable=False)
    PASSPORTURL = db.Column(db.String(255), nullable=False)

    # ✅ Registration Timestamp
    RegisteredAt = db.Column(db.DateTime, default=datetime.utcnow)

class FeedbackStatus(db.Model):
    __tablename__ = 'Feedback_Status'

    StatusID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    StatusName = db.Column(db.String(50), nullable=False, unique=True)

class Feedback(db.Model):
    __tablename__ = 'Feedback'

    FeedbackID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Email = db.Column(db.String(100))
    Subject = db.Column(db.String(200))
    Message = db.Column(db.Text)
    StatusID = db.Column(db.Integer, db.ForeignKey('Feedback_Status.StatusID'))
    status = db.relationship('FeedbackStatus', backref='feedbacks')
    SubmittedAt = db.Column(db.DateTime, default=datetime.utcnow)

class FAQ(db.Model):
    __tablename__ = 'FAQs'

    FAQID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Question = db.Column(db.String(500), nullable=False)
    Answer = db.Column(db.Text, nullable=False)
    CreatedDate = db.Column(db.DateTime, default=datetime.utcnow)
    IsActiveID = db.Column(db.Integer, db.ForeignKey('IsActive.ID'))
    is_active = db.relationship('IsActive', backref='faqs')

class IsActive(db.Model):
    __tablename__ = 'IsActive'

    ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Status = db.Column(db.String(50), nullable=False, unique=True)

class Career(db.Model):
    __tablename__ = 'Career'

    CareerID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    JobTitle = db.Column(db.String(150), nullable=False)
    JobDescription = db.Column(db.Text, nullable=False)
    Requirements = db.Column(db.Text)
    JobType = db.Column(db.String(50))
    Deadline = db.Column(db.Date)
    ApplicationInstructions = db.Column(db.String(1000))
    IsActiveID = db.Column(db.Integer, db.ForeignKey('IsActive.ID'))
    is_active = db.relationship('IsActive', backref='careers')
    PostedDate = db.Column(db.DateTime, default=datetime.utcnow)

class Resources(db.Model):
    __tablename__ = 'Resources'

    ResourceID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Title = db.Column(db.String(150), nullable=False)
    FilePath = db.Column(db.String(255), nullable=False)
    IsActiveID = db.Column(db.Integer, db.ForeignKey('IsActive.ID'))
    is_active = db.relationship('IsActive', backref='resources')
    UploadedAt = db.Column(db.DateTime, default=datetime.utcnow)

class Post(db.Model):
    __tablename__ = 'Posts'

    PostID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Title = db.Column(db.String(200), nullable=False)
    Content = db.Column(db.Text, nullable=False)
    CoverImage = db.Column(db.String(255))
    DatePosted = db.Column(db.DateTime, default=datetime.utcnow)

class SaccoClient(db.Model):
    __tablename__ = 'Sacco_Clients'

    ClientID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ClientName = db.Column(db.String(150), nullable=False)
    ClientStatistic = db.Column(db.String(300))
    LogoURL = db.Column(db.String(255))
    IsActiveID = db.Column(db.Integer, db.ForeignKey('IsActive.ID'))
    is_active = db.relationship('IsActive', backref='clients')
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow)


class BOD(db.Model):
    __tablename__ = 'BOD'
    BODID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Designation = db.Column(db.String(100))
    ImageURL = db.Column(db.Text)

class Management(db.Model):
    __tablename__ = 'Management'
    MGTID = db.Column(db.Integer, primary_key=True)
    MGTName = db.Column(db.String(100), nullable=False)
    Designation = db.Column(db.String(100))
    ImageURL = db.Column(db.Text)


class HolidayMessage(db.Model):
    __tablename__ = 'HolidayMessages'

    HolidayID = db.Column(db.Integer, primary_key=True)
    HolidayName = db.Column(db.String(100), nullable=False)
    Message = db.Column(db.String(255), nullable=False)
    IsActive = db.Column(db.Integer, nullable=False, default=1)  
    CreatedAt = db.Column(db.DateTime)
    Month = db.Column(db.Integer, nullable=False)
    Day = db.Column(db.Integer, nullable=False)

class GalleryPhoto(db.Model):
    __tablename__ = 'GalleryPhotos'

    PhotoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Title = db.Column(db.String(100))
    Description = db.Column(db.Text)  
    ImageURL = db.Column(db.String(500), nullable=False)
    UploadedAt = db.Column(db.DateTime, default=datetime.utcnow)
    IsActive = db.Column(db.Boolean, default=True)