# Mini Log Analytics & Alert System

A backend system that ingests logs, processes them, and detects abnormal error patterns.

## Features
- Log ingestion using REST APIs
- Sliding window-based error detection
- Alert generation mechanism

## Tech Stack
- Node.js
- Express.js

## How it Works
The system collects logs through an API and analyzes the last 10 logs.  
If the number of ERROR logs exceeds a threshold, an alert is generated.

## API Endpoints
- POST /log → Add log
- GET /logs → View logs
- GET /alerts → View alerts

## Run the Project
1. npm install  
2. node server.js  
3. Test APIs using Thunder Client or Postman
