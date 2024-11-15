import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();
  const handleToast = (message, toastType) => {
    toastType === "danger" ? toast.error(message) : toast.success(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = "http://localhost:5000/user";
      const userData = { userName, userEmail, userAge, userPassword };

      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const apiResponse = await response.json();
      if (response.ok) {
        handleToast(apiResponse.message, "success");
        setUserName("");
        setUserEmail("");
        setUserAge("");
        setUserPassword("");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        handleToast(apiResponse.error, "danger");
      }
    } catch (error) {
      handleToast("Registration failed", "danger");
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
          maxWidth: "500px",
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
        <h1
          style={{
            textAlign: "center",
            color: "#ff6f00",
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: "2rem",
          }}
        >
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit}>
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
              htmlFor="userEmail"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "5px",
                color: "#333",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
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
              htmlFor="userAge"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "5px",
                color: "#333",
              }}
            >
              Age
            </label>
            <input
              type="number"
              id="userAge"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              placeholder="Enter your age"
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
              placeholder="Create a password"
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
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(45deg, #ff6f00, #ff3e00)")}
          >
            Register
          </button>
          <div style={{ textAlign: "center", marginTop: "15px", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#ff6f00",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Log in
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
