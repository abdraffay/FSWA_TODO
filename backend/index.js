const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

const { connectDB } = require("./Configs/connectionDB");
const authMiddleware = require("./Middleware/authMiddleware"); // Path to the auth middleware

// Models
const { UserRegistration } = require("./Models/Registration");
const { TodoModel } = require("./Models/Todo");

// Controllers
const { CreateUser, loginUser } = require('./Controllers/UserController');
const { createTodo, getTodoList, getCategories, deleteTodo, updateTodo } = require("./Controllers/TodoController");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.route("/category").get(getCategories);
app.route("/user").post(CreateUser);
app.route("/login").post(loginUser);
app.route("/todo")
  .post(authMiddleware, createTodo) // Apply authMiddleware to protect the route
  .get(authMiddleware, getTodoList) // Apply authMiddleware here as well
// In your route definitions (e.g., app.js or routes.js)
app.route("/todo/:todoId").delete(authMiddleware, deleteTodo).put(authMiddleware, updateTodo);


// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});
