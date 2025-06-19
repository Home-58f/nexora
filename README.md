# Simple Feedback Manager
 # Objective
This project is a basic MERN (MongoDB, Express.js, React, Node.js) stack web application designed to allow users to submit feedback and view a list of all submitted feedbacks. It serves as a demonstration of fundamental full-stack web development skills.

# Features
Backend (Node.js + Express + MongoDB)
Feedback Model:
name (string, required)
email (string, required)
message (string, required)
createdAt (date, auto-generated timestamp)

# RESTful API Endpoints:
POST /api/feedbacks: Saves a new feedback entry to the database.
GET /api/feedbacks: Retrieves all submitted feedbacks, sorted by createdAt in descending order (newest first).
DELETE /api/feedbacks/:id: Deletes a specific feedback entry by its ID.
Error Handling: Basic middleware for handling API errors.
Environment Variables: Uses .env file for secure configuration of MongoDB URI and server port.

# Frontend (React.js)
Feedback Submission Form: A user-friendly form with fields for Name, Email, and Message.
Feedback List View: Displays all submitted feedbacks in a clear and organized list.
Basic Validation: Client-side validation to ensure no empty fields are submitted.
Loading States: Visual indicators (spinners) during data fetching and submission.
Error Handling States: Displays user-friendly error messages if API calls fail.
Delete Functionality (Bonus): A delete button for each feedback item in the list, accompanied by a confirmation modal for enhanced user experience.
Responsive Design: Styled using Tailwind CSS for a clean, modern, and adaptive interface.

# Technologies Used
# Backend
Node.js: JavaScript runtime environment.
Express.js: Fast, unopinionated, minimalist web framework for Node.js.
MongoDB: NoSQL database for storing feedback data.
Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
dotenv: To load environment variables from a .env file.
cors: Middleware to enable Cross-Origin Resource Sharing.
express-async-handler: Simple wrapper for Express async middleware.

# Frontend
React.js: JavaScript library for building user interfaces.
create-react-app: For bootstrapping the React project.
lucide-react: For sleek, customizable icons.
fetch API: For making HTTP requests to the backend API.
Tailwind CSS: A utility-first CSS framework for rapid UI development.