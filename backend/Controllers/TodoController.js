const { TodoModel } = require("../Models/Todo");
const { Category } = require("../Models/Category");

// Get all categories
async function getCategories(req, res) {
  try {
    const allCat = await Category.find();
    return res.status(200).send(allCat);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

// Get all todos for the logged-in user
async function getTodoList(req, res) {
  try {
    const userId = req.user.userId; // Get userId from the decoded token
    const userTodos = await TodoModel.find({ userId });
    return res.status(200).send(userTodos);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

// Create a new todo
async function createTodo(req, res) {
  const { todoName, todoCat } = req.body;

  if (!todoName) {
    return res.status(400).send({ error: "Todo name must be filled" });
  }
  if (!todoCat) {
    return res.status(400).send({ error: "Category must be selected" });
  }

  try {
    const userId = req.user.userId; // Get userId from the decoded token
    const todo = await TodoModel.create({
      todoName,
      todoCat,
      userId,
    });

    if (todo) {
      return res.status(201).send({ message: "Todo Added Successfully" });
    } else {
      return res.status(500).send({ error: "Failed to Add todo" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

// Update a todo by its ID
async function updateTodo(req, res) {
  const { todoId } = req.params;
  const { todoName, todoCat } = req.body;

  if (!todoName) {
    return res.status(400).send({ error: "Todo name must be filled" });
  }
  if (!todoCat) {
    return res.status(400).send({ error: "Category must be selected" });
  }

  try {
    const userId = req.user.userId; // Get userId from the decoded token

    // Find the todo and check if it belongs to the logged-in user
    const todo = await TodoModel.findOne({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).send({ error: "Todo not found or you are not authorized to update this todo" });
    }

    // Update the todo
    todo.todoName = todoName;
    todo.todoCat = todoCat;

    await todo.save(); // Save the updated todo

    return res.status(200).send({ message: "Todo updated successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

// Delete a todo by its ID
async function deleteTodo(req, res) {
  try {
    const { todoId } = req.params;
    const userId = req.user.userId; // Get userId from the decoded token

    const todo = await TodoModel.findOneAndDelete({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).send({ error: "Todo not found or you are not authorized to delete this todo" });
    }

    return res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

module.exports = { createTodo, getTodoList, getCategories, deleteTodo, updateTodo };
