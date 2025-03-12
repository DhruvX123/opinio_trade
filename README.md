Installation Guide

Prerequisites

Install Node.js

Install MongoDB

Setup

Clone the repository:
https://github.com/DhruvX123/opinio_trade

Install dependencies:
npm install

Start the server:
node server.js 

The server will start on port 3000

API Endpoints

User Routes

POST /api/users/signup - Register a new user

POST /api/users/login - User login

Event Routes

GET /api/events/live - Fetch live sports events

POST /api/events - Create a new event (Admin only)

POST /api/events/:eventId/resolve - Resolve event (Admin only)

Trade Routes

POST /api/trades - Place a trade on an event

