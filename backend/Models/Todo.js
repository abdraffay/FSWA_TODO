const mongoose = require("mongoose");

const userTodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRegistration", // Reference your user model here
    required: true,
  },
  todoName: {
    type: String,
    required: [true, "Todo name must be filled"],
  },
  todoCat: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now, // Automatically assigns the current date
  },
});

const TodoModel = mongoose.model("TodoModel", userTodoSchema);
module.exports = { TodoModel };
