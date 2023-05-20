import React from "react";
import Chatbot from "./components/Chatbot";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Headerr } from "./components/Headerr";
import SignUp from "./components/SignUp";
import { BrowserRouter } from "react-router-dom";
import { Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Main from "./components/Main";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/chat" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
