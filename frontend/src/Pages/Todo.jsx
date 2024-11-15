import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoCat, setTodoCat] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [todoDelete, settodoDelete] = useState(null);
  const [todoUpdate, settodoUpdate] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleToast = (message, toastType) => {
    toastType === "danger" ? toast.error(message) : toast.success(message);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAllCategories(data);
    } catch (error) {
      handleToast("Failed to load categories", "danger");
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      handleToast("Failed to load todos", "danger");
    }
  };

  const deleteTodo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/todo/${todoDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        handleToast("Todo Deleted", "success");
        fetchTodos();
        setShowDeleteModal(false);
      } else {
        handleToast("Failed to delete todo", "danger");
      }
    } catch (error) {
      handleToast("An error occurred", "danger");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { todoName, todoCat, userId: id };
    try {
      const response = await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      });
      const responseData = await response.json();
      if (response.ok) {
        handleToast(responseData.message, "success");
        fetchTodos();
        setTodoName("");
        setTodoCat("");
      } else {
        handleToast(responseData.error || "Failed to add todo", "danger");
      }
    } catch (error) {
      handleToast("An error occurred", "danger");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedTodo = { todoName, todoCat };
    try {
      const response = await fetch(`http://localhost:5000/todo/${todoUpdate._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTodo),
      });
      const responseData = await response.json();
      if (response.ok) {
        handleToast(responseData.message, "success");
        fetchTodos();
        setShowUpdateModal(false);
      } else {
        handleToast(responseData.error || "Failed to update todo", "danger");
      }
    } catch (error) {
      handleToast("An error occurred", "danger");
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchTodos();
    }
  }, [token]);

  const spicyStyle = {
    container: { maxWidth: "800px", margin: "auto", padding: "20px" , },
    form: {
      backgroundColor: "#ffebd6",
      padding: "20px",
      borderRadius: "10px",
      border: "2px solid #ff7f50",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    title: { color: "#ff4500", fontWeight: "bold", textAlign: "center" },
    table: { marginTop: "30px" },
    tableHead: { backgroundColor: "#ff7f50", color: "#fff" },
    button: { backgroundColor: "#ff4500", borderColor: "#ff4500", color: "#fff" },
    modalBackdrop: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "1050",
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff2e5",
      border: "2px solid #ff4500",
      borderRadius: "10px",
      padding: "20px",
      zIndex: "1100",
      width: "90%",
      maxWidth: "400px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    },
    modalHeader: {
      borderBottom: "2px solid #ff4500",
      marginBottom: "10px",
      color: "#ff4500",
      fontWeight: "bold",
      fontSize: "18px",
    },
    modalFooter: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "10px",
    },
  };

  return (
    
    <div style={spicyStyle.container}>
      <form onSubmit={handleSubmit} style={spicyStyle.form}>
        <h3 style={spicyStyle.title}>Add Todo</h3>
        <div className="mb-3">
          <label htmlFor="todoName" className="form-label">
            Todo Name
          </label>
          <input
            type="text"
            className="form-control"
            id="todoName"
            placeholder="Enter Todo Name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="todoCat" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="todoCat"
            value={todoCat}
            onChange={(e) => setTodoCat(e.target.value)}
          >
            <option value="">Select Category</option>
            {allCategories.map((cat, index) => (
              <option key={index} value={cat.todoCat}>
                {cat.todoCat}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn w-100" style={spicyStyle.button}>
          Add Todo
        </button>
      </form>

      <div style={spicyStyle.table}>
        <h3 style={spicyStyle.title}>My Todos</h3>
        <table className="table table-bordered table-hover">
          <thead>
            <tr style={spicyStyle.tableHead}>
              <th>#</th>
              <th>Todo Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <tr key={todo._id}>
                  <td>{index + 1}</td>
                  <td>{todo.todoName}</td>
                  <td>{todo.todoCat}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm m-2"
                      style={spicyStyle.button}
                      onClick={() => {
                        settodoDelete(todo._id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm m-2"
                      style={spicyStyle.button}
                      onClick={() => {
                        settodoUpdate(todo);
                        setTodoName(todo.todoName);
                        setTodoCat(todo.todoCat);
                        setShowUpdateModal(true);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No todos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && todoDelete && (
        <div style={spicyStyle.modalBackdrop}>
          <div style={spicyStyle.modal}>
            <div style={spicyStyle.modalHeader}>Confirm Delete</div>
            <p>Are you sure you want to delete this todo?</p>
            <div style={spicyStyle.modalFooter}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={deleteTodo}>
                Delete Todo
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && todoUpdate && (
        <div style={spicyStyle.modalBackdrop}>
          <div style={spicyStyle.modal}>
            <div style={spicyStyle.modalHeader}>Update Todo</div>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-3">
                <label htmlFor="todoName" className="form-label">
                  Todo Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="todoName"
                  value={todoName}
                  onChange={(e) => setTodoName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="todoCat" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="todoCat"
                  value={todoCat}
                  onChange={(e) => setTodoCat(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {allCategories.map((cat, index) => (
                    <option key={index} value={cat.todoCat}>
                      {cat.todoCat}
                    </option>
                  ))}
                </select>
              </div>
              <div style={spicyStyle.modalFooter}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Todo;
