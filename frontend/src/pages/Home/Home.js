import React, { useState, useRef, useEffect } from "react";
import "./Home.scss";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Footer from "../../components/Footer/Footer";
// import Platform from "../Platform/Platform";
// import Usage from "../Usage/Usage";
import Thought from "../Thought/Thought";
import Distortions from "../Distortions/Distortions";
import Reframe from "../Reframe/Reframe";
import Situation from "../Situation/Situation";
import Emotion from "../Emotion/Emotion";
import Survey from "../Survey/Survey";
import { stages } from "../../assets/variables";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selections, setSelections] = useState(Array(stages.length).fill(null));
  const components = [
    // Platform,
    // Usage,
    Thought,
    Emotion,
    Situation,
    Distortions,
    Reframe,
    Survey,
  ];
  const componentProps = {
    // Platform: { selections, setSelections, currentPage },
    // Usage: {
    //   selections,
    //   setSelections,
    //   currentPage,
    //   app: selections[0],
    // },
    Thought: {
      selections,
      setSelections,
      currentPage,
      app: selections[0],
    },
    Emotion: {
      selections,
      setSelections,
      currentPage,
    },
    Situation: {
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
    Survey: {
      /* Props for Survey */
    },
  };

  const canContinue = () => {
    // Check if the current page is Emotion and all necessary inputs have values
    if (stages[currentPage] === "Emotion") {
      // Assuming selections for Emotion are stored as an object at the currentPage index
      // And contains keys like beliefRating, emotion, and emotionIntensity
      const emotionSelections = selections[currentPage];
      return (
        emotionSelections &&
        emotionSelections.beliefRating &&
        emotionSelections.emotion &&
        emotionSelections.emotionIntensity
      );
    } else {
      // For other pages, just check if there is a selection
      return selections[currentPage] !== null && selections[currentPage] != "";
    }
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
    </div>
  );
};

export default Home;
