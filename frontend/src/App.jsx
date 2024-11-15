import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ErrorPage from "./Pages/ErrorPage";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Todo from "./Pages/Todo";



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo"  element={<Todo/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
