# ✅ Base image pinned to Debian 12 (bookworm)
FROM python:3.11-slim-bookworm

# ✅ Python/runtime env
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DEBIAN_FRONTEND=noninteractive \
    PIP_NO_CACHE_DIR=1

# ✅ System deps + unixODBC + Microsoft repo (no apt-key)
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
      build-essential \
      curl \
      gnupg2 \
      ca-certificates \
      unixodbc \
      unixodbc-dev \
      libpq-dev; \
    # Add Microsoft repo key via keyring (bookworm)
    curl -fsSL https://packages.microsoft.com/keys/microsoft.asc \
      | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg; \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft-prod.gpg] https://packages.microsoft.com/debian/12/prod bookworm main" \
      > /etc/apt/sources.list.d/microsoft-prod.list; \
    apt-get update; \
    ACCEPT_EULA=Y apt-get install -y msodbcsql18; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/*

# ✅ App
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# ✅ Flask / Gunicorn
ENV FLASK_APP=app.py
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
