import React from "react";
import "./index.css";

const Home = ({ setTab }) => {
  return (
    <div className="home-screen">
      <div className="welcome-text">
        Welcome to <span>ContenTerra</span> Assignment
      </div>
      <div onClick={() => setTab(2)} className="click-me">Click here to see the cards</div>
    </div>
  );
};

export default Home;
