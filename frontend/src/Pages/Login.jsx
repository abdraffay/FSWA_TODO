import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleToast = (message, toastType) => {
    toastType === "danger" ? toast.error(message) : toast.success(message);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API = "http://localhost:5000/login";
      const LoginUser = { userName, userPassword };

      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(LoginUser),
      });

      const responseData = await response.json();
      if (response.ok) {
        handleToast("Login successful", "success");
        localStorage.setItem("token", responseData.token);
        setTimeout(() => navigate("/todo"), 2000);
      } else {
        handleToast(responseData.error, "danger");
      }
    } catch (error) {
      handleToast("Login failed", "danger");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #ff7b54, #ffa41b)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "400px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
          transform: "scale(1)",
          transition: "transform 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#ff6f00",
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: "1.8rem",
          }}
        >
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="userName"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "5px",
                color: "#333",
              }}
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              required
              style={{
                width: "100%",
                padding: "10px 15px",
                borderRadius: "6px",
                border: "2px solid #ffa41b",
                outline: "none",
                fontSize: "1rem",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff6f00")}
              onBlur={(e) => (e.target.style.borderColor = "#ffa41b")}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="userPassword"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "5px",
                color: "#333",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "10px 15px",
                borderRadius: "6px",
                border: "2px solid #ffa41b",
                outline: "none",
                fontSize: "1rem",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff6f00")}
              onBlur={(e) => (e.target.style.borderColor = "#ffa41b")}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px 15px",
              background: "linear-gradient(45deg, #ff6f00, #ff3e00)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#e63900")}
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(45deg, #ff6f00, #ff3e00)")
            }
          >
            Login
          </button>
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "0.9rem",
            }}
          >
            Don't have an account?{" "}
            <a
              href="/"
              style={{
                color: "#ff6f00",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Register
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
