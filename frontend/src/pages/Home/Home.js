import React, { useState, useRef, useEffect } from "react";
import "./Home.scss";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Footer from "../../components/Footer/Footer";
import Platform from "../Platform/Platform";
import Usage from "../Usage/Usage";
import Issue from "../Issue/Issue";
import Distortions from "../Distortions/Distortions";
import Reframe from "../Reframe/Reframe";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const stages = ["Platform", "Usage", "Issue", "Distortions", "Reframe"];
  const components = [Platform, Usage, Issue, Distortions, Reframe];

  const handleBack = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }

  const handleForward = () => {
    setCurrentPage((prev) => Math.min(prev + 1, stages.length - 1));
  }

  return (
    <div>
      <HeaderBar
        progress={currentPage}
        sections={stages}
      />
      <div className="home-container">
        {React.createElement(components[currentPage])}
      </div>
      <Footer onBack={handleBack} onForward={handleForward}/>
    </div>
  );
};

export default Home;
