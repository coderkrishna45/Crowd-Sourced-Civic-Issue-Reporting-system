# Crowd-Sourced Civic Issue Reporter

A full-stack CRUD web application that allows users to report local civic issues and provides a private admin dashboard for management. Built from scratch to demonstrate expertise in modern web development, from frontend interactivity to backend API design and database integration.

---

## Core Features

- User Submission Form: Clean, responsive form with dynamic dropdowns and client-side validation.
- Admin Dashboard: Private dashboard that displays all reported issues in real-time.
- Full CRUD Functionality: Administrators can create, read, update, and delete issues without page reloads.
- Asynchronous Operations: Built with the Fetch API for smooth user experience.
- Persistent Data Storage: All issue data is stored in a cloud-hosted MongoDB Atlas database.

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
  - DOM Manipulation
  - Event Handling & Delegation
  - Fetch API (AJAX)

### Backend
- Node.js
- Express.js
- Mongoose (ODM for MongoDB)
- MongoDB Atlas
- REST API for all CRUD operations
- CORS configured for cross-origin requests
- Environment variables managed with dotenv

---

## Running Locally

### Prerequisites
- Git
- Node.js (with npm)
- VS Code (with Live Server extension)
### 1. Clone the Repository
```bash
git clone https://github.com/coderkrishna45/Crowd-Sourced-Civic-Issue-Reporting-system.git
cd Crowd-Sourced-Civic-Issue-Reporting-system
```
### 2.Setup Backend

# Navigate into the backend folder
cd Backend

# Install the necessary packages
npm install

# Create the environment file
# You will need to create a new file named .env in the Backend folder
# and add your MongoDB connection string to it like this:
# MONGO_URI=your_mongodb_connection_string

# Start the backend server (it will run on http://localhost:3000)
node server.js


### Run the Frontend

 Open the project in VS Code.

 Navigate to the Frontend folder.

 Right-click on index.html and choose "Open with Live Server".

 To view the admin panel, right-click on admin.html and choose "Open with Live Server".

### API Endpoints

# The backend server provides the following RESTful API endpoints

## | Method | URL Path        | Description                   |
#  |--------|---------------- |-------------------------------|
#  | GET    | /api/issues     |Get a list of all active issues|
#  | POST   | /api/issues     | Create a new issue            |
#  | PATCH  | /api/issues/:id | Update the status of an issue |
#  | DELETE | /api/issues/:id | Delete an issue               |


