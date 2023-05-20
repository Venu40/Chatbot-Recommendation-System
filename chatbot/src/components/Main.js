import React from "react";
import Chatbot from "./Chatbot";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Headerr } from "./Headerr";
import SignUp from "./SignUp";
function Main() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <Headerr />

        {/* <Header /> */}
        <Chatbot />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Main;
