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
  const [selections, setSelections] = useState(Array(5).fill(null));
  const components = [Platform, Usage, Issue, Distortions, Reframe];
  const componentProps = {
    Platform: { selections, setSelections, currentPage },
    Usage: {
      selections,
      setSelections,
      currentPage,
      app: selections[0],
    },
    Issue: {
      selections,
      setSelections,
      currentPage,
      app: selections[0],
    },
    Distortions: {
      /* Props for Distortions */
    },
    Reframe: {
      /* Props for Reframe */
    },
  };

  const CurrentComponent = components[currentPage];
  const props = componentProps[stages[currentPage]];

  const handleBack = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleForward = () => {
    setCurrentPage((prev) => Math.min(prev + 1, stages.length - 1));
  };

  return (
    <div>
      <HeaderBar progress={currentPage} sections={stages} />
      <div className="home-container">
        {React.createElement(CurrentComponent, props)}
      </div>
      <Footer
        onBack={handleBack}
        onForward={handleForward}
        canContinue={selections[currentPage] !== null && currentPage < 4}
        canGoBack={currentPage > 0}
      />
    </div>
  );
};

export default Home;
