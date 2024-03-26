import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import './App.css';
import End from "./pages/End/End"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/end" element={<End />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
