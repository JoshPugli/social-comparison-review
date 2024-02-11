import React, { useState, useRef } from "react";
import "./Home.scss"; // Assuming you have your SCSS file
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [problem, setProblem] = useState("");
  const [showDistortions, setShowDistortions] = useState(false);
  const distortionsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDistortions(true);
    scrollToDistortions();
  };

  const scrollToDistortions = () => {
    distortionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <HeaderBar
        progress={0}
        sections={["Platform", "Usage", "Issue", "Distortions", "Reframe"]}
      />
      <div className="home-container">
        <h2>What's on your mind?</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your problem"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        {showDistortions && (
          <div ref={distortionsRef} className="distortions-section">
            {/* Distortions content goes here */}
            <h3>Select the distortion that fits your situation:</h3>
            {/* Example distortion */}
            <div className="distortion">All-or-Nothing Thinking</div>
          </div>
        )}
      </div>
        <Footer />
    </div>
  );
};

export default Home;
