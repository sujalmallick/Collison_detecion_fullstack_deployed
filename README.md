Collision Detection System (CDS)

The Collision Detection System (CDS) is a cloud-deployed, AI-powered accident detection platform built using a FastAPI backend, React + TypeScript + Vite frontend, and a CNN-based computer vision model.
The system identifies vehicle collisions in real time, sends automated alerts, and provides a monitoring dashboard for traffic authorities and emergency responders.

Live Deployment

**Frontend (CloudFront):**
`https://d10uokp8q1uvzj.cloudfront.net/` ##this may not work later , as we may disable our services in aws for this project u can run it locally by changing the url to localhost in server.py and demosection file


## Overview

CDS continuously analyzes video feeds to detect and classify vehicle collisions. The system integrates object detection, bounding-box intersection logic, and CNN-based classification to identify genuine accidents. Confirmed incidents trigger automated alerts and are logged with associated metadata.

Key capabilities include:

* Real-time vehicle detection using YOLO-based models
* Collision confirmation using a CNN classifier
* Live dashboard with bounding boxes and confidence scores
* Secure, scalable, cloud-hosted architecture (S3 + CloudFront + EC2)
* Structured incident logging for analytics

Project details and diagrams are based on the official documentation included in the Software Engineering Report (pages 4–5, 23–27). 

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* Hosted on AWS S3
* Distributed globally using CloudFront CDN

### Backend

* FastAPI
* Python
* TensorFlow-cpu / OpenCV
* CNN accident classifier
* Dockerized and deployed on AWS EC2

### Infrastructure

* AWS S3 for static website hosting
* AWS CloudFront for CDN distribution
* AWS EC2 for backend inference API
* HTTPS endpoint communication

## System Architecture

### High-Level Architecture

* Browser uploads media via CloudFront → S3-hosted frontend
* Frontend sends media to FastAPI backend on EC2
* Backend loads CNN model and performs inference
* Collision detected using bounding-box overlap + classifier
* Result returned to frontend with confidence score
* Incident stored in server logs (time, location, severity, evidence)

### Deployment Diagram Reference

Available in project documentation (page 24). 

### Component Diagram Reference

Includes modules such as Vehicle Detector, Collision Detector, Alert Manager, and Incident Repository (page 23). 

## Features

### Collision Detection

* YOLO-based real-time vehicle detection
* Axis-Aligned Bounding Box (AABB) collision estimation
* DenseNet201/CNN-based confirmation model

### Automated Alert System

* Sends emergency alerts with relevant metadata
* Optionally attaches short pre- and post-event video evidence


### Incident Logging

* Saves each confirmed incident
* Stores timestamps, severity, and evidence
* Helps identify risk patterns and high-risk zones


## Project Structure

```
root/
│
├── Cds-frontend/                    # React + TypeScript + Vite frontend
│   ├── src/
│   ├── public/
│   └── dist/
│
├── Collision-Detection-System/      # FastAPI backend
│   ├── server.py
│   ├── camera.py
│   ├── model/                       # CNN model files
│   ├── accident_photos/             # Uploaded images
│   ├── Dockerfile
│   └── requirements.txt
│
└── README.md
```

---

## API Endpoints (FastAPI)

```
POST /predict           → Run CNN model inference
POST /upload            → Upload image/video to backend
GET  /health            → Backend health check
GET  /incidents         → Retrieve incident logs
```

---

## Deployment Instructions

### Frontend (S3 + CloudFront)

1. Build the frontend

   ```
   npm run build
   ```
2. Upload the `dist/` folder to S3
3. Connect S3 bucket to CloudFront
4. Invalidate CloudFront cache for updates

### Backend (EC2 + Docker)

1. Build Docker image

   ```
   docker build -t cds-backend .
   ```
2. Run container

   ```
   docker run -p 8000:8000 cds-backend
   ```
3. Open EC2 security group for port 8000
4. Use the EC2 public IP in frontend config

---

## Testing Overview

Testing was performed based on the Software Engineering report (pages 28–36).
This included:

* Frontend functional testing
* API correctness testing
* CNN model inference validation
* Peer testing of collision detection, real-time response, alert correctness, and UI clarity

Peer test case results confirmed accurate collision detection, correct threshold handling, and stable UI behavior.

---

## Test Cases Summary

| Test Case ID | Description                                    | Result |
| ------------ | ---------------------------------------------- | ------ |
| TC-CDS-01    | YOLO-Based Collision Detection                 | Pass   |
| TC-CDS-03    | Collision Detection (Live Feed / Video Upload) | Pass   |
| TC-CALL-01   | Automated Emergency Call                       | Pass   |  |

(Refer to pages 31–33 for detailed templates.) 

---

## Contributors

* Sujal Mallick — Frontend, Backend, AWS Deployment
* Rohan Malhotra — ML Model, Alert System
* Pranav Keswani — Frontend, UI/UX
* Vansh Bhasin — Testing, Model Evaluation

