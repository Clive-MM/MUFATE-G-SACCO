# routes/routes.py

from flask import Blueprint, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from models.models import db, User, SaccoProfile, HomepageSlider, CoreValue, MobileBankingInfo, SaccoBranch, OperationTimeline, Product, Service, SaccoStatistics, Partnership, Membership, FeedbackStatus, Feedback, FAQ, IsActive, Career, Resource, Post, SaccoClient

routes = Blueprint('routes', __name__)  # Blueprint definition

bcrypt = Bcrypt()
jwt = JWTManager()

@routes.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Test route working successfully!"})
