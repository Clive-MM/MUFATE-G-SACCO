# ✅ Base image
FROM python:3.11-slim

# ✅ Prevent .pyc files and enable unbuffered logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ✅ Install ODBC + system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc g++ gnupg curl unixodbc-dev unixodbc \
    libpq-dev apt-transport-https ca-certificates && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# ✅ Set working directory
WORKDIR /app

# ✅ Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ✅ Copy rest of the project
COPY . .

# ✅ Set environment variable for Flask
ENV FLASK_APP=app.py

# ✅ Expose Flask port
EXPOSE 5000

# ✅ Start server using Gunicorn (production-ready)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
