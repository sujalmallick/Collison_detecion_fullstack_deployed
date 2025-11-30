# ===============================
# STAGE 1 — Base Python environment
# ===============================
FROM python:3.12-slim AS base

# Avoid Python buffering + faster logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies (OpenCV, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# ===============================
# STAGE 2 — Install Python deps
# ===============================
FROM base AS deps

COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# ===============================
# STAGE 3 — Final runtime image
# ===============================
FROM base

# Copy installed packages from deps layer
COPY --from=deps /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY --from=deps /usr/local/bin /usr/local/bin

# Copy app files
COPY server.py .
COPY detection.py .
COPY camera.py .
COPY model.json .
COPY model_weights.keras .
COPY .env .

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI server (latest uvicorn recommended)
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
