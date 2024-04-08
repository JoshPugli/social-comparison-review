import React, { useState, useRef, useEffect } from "react";
import "./Home.scss";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Footer from "../../components/Footer/Footer";
import Thought from "../Thought/Thought";
import Distortion from "../Distortions/Distortions";
import Reframe from "../Reframe/Reframe";
import Situation from "../Situation/Situation";
import Emotion from "../Emotion/Emotion";
import Finalize from "../Finalize/Finalize";
import { stages } from "../../assets/constants";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(5); // Change this to 0 to start from the beginning
  const [selections, setSelections] = useState(Array(stages.length).fill(null));
  const navigate = useNavigate();
  const components = [Thought, Emotion, Situation, Distortion, Reframe, Finalize];
  const componentProps = {
    Thought: {
      selections,
      setSelections,
      currentPage,
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
    },
    Distortion: {
      selections,
      setSelections,
      currentPage,
      thought: selections[0],
      situation: selections[2],
    },
    Reframe: {
      selections,
      setSelections,
      currentPage,
      thought: selections[0],
      situation: selections[2],
      distortions: selections[3],
    },
    Finalize: {
      selections,
      setSelections,
      currentPage,
    },
  };

  useEffect(() => {
    console.log("Current page:", currentPage);
    console.log("Selections:", selections);
  }, [currentPage, selections]);

  const canContinue = () => {
    if (stages[currentPage] === "Emotion") {
      const emotionSelections = selections[currentPage];
      return (
        emotionSelections &&
        emotionSelections.beliefRating &&
        emotionSelections.emotion &&
        emotionSelections.emotionIntensity
      );
    } else {
      return selections[currentPage] !== null && selections[currentPage] != "";
    }
  };

  const CurrentComponent = components[currentPage];
  const props = componentProps[stages[currentPage]];

  const handleBack = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleForward = () => {
    if (currentPage === stages.length - 1) {
      navigate("/end");
    } else {
      setCurrentPage((prev) => Math.min(prev + 1, stages.length - 1));
    }
  };

  return (
    <div className="page-container">
      <HeaderBar progress={currentPage} sections={stages} />
      <div className="home-container">
        {React.createElement(CurrentComponent, props)}
      </div>
      <Footer
        onBack={handleBack}
        onForward={handleForward}
        canContinue={canContinue()}
        canGoBack={currentPage > 0}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
