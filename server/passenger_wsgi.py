import sys
import os

# Path to your project (folder where app.py is located)
project_home = os.path.dirname(os.path.abspath(__file__))

# Add project path to sys.path
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Load environment variables manually (cPanel does NOT auto-load .env files)
from dotenv import load_dotenv
load_dotenv(os.path.join(project_home, ".mufate_env"))

# Import Flask app
from app import app as application
