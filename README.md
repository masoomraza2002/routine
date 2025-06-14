#  Routine Management System

A full-stack productivity and wellness app to help users plan meals, track routines, and log daily activity — complete with user authentication, 7-day streak tracking, and modular structure.

##   Features

###   Core Modules
- **Meal Planner**: Create and manage meal plans
- **Routine Tracker**: Set up and track workout or productivity routines
- **Daily Entry Logs**: Log what you've completed each day

###   User Features
- Authentication & Authorization (JWT)
- 7-Day Streak Tracking System
- Secure ownership verification for all actions

---

##   Tech Stack

###   Backend
- Node.js, Express
- MongoDB + Mongoose
- JWT for Auth
- Middleware-based access control
- Bcrypt

### 🎨 Frontend
- React
- CSS
- Axios





##  How to Run Locally

###  Prerequisites
- Node.js & npm
- MongoDB instance

###  Setup Steps

1. Clone this repo:
   git clone https://github.com/masoomraza2002/routine
Set up the backend:

bash
Copy
Edit
cd backend
npm install
# Create a `.env` file with DB and JWT info
node index.js
Set up the frontend:

bash
Copy
Edit
cd frontend
npm install
npm run dev
