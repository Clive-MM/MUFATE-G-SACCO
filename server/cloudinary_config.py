import os
import cloudinary
from dotenv import load_dotenv

# Load environment variables from .mufate_env
load_dotenv(dotenv_path=".mufate_env")

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)
