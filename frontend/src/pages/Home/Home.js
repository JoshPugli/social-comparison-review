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
import End from "../End/End";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? JSON.parse(savedPage) : 0; // Change this default value as needed
  });
  const [selections, setSelections] = useState(() => {
    const savedSelections = sessionStorage.getItem("selections");
    return savedSelections
      ? JSON.parse(savedSelections)
      : Array(stages.length).fill(null);
  });
  const [isFinal, setIsFinal] = useState(() => {
    const savedIsFinal = sessionStorage.getItem("isFinal");
    return savedIsFinal ? JSON.parse(savedIsFinal) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
    sessionStorage.setItem("selections", JSON.stringify(selections));
    sessionStorage.setItem("isFinal", JSON.stringify(isFinal));
  }, [currentPage, selections, isFinal]);
  const components = [
    Thought,
    Emotion,
    Situation,
    Distortion,
    Reframe,
    Finalize,
    End,
  ];
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
    End: {
      selections,
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

  const CurrentComponent = isFinal ? End : components[currentPage];
  const props = isFinal
    ? componentProps["End"]
    : componentProps[stages[currentPage]];

  const handleBack = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleForward = () => {
    if (currentPage === stages.length - 1) {
      setIsFinal(true);
      // navigate("/end", { state: { selections } });
    } else {
      setCurrentPage((prev) => Math.min(prev + 1, stages.length - 1));
    }
  };

  return (
    <div className="page-container">
      <HeaderBar progress={currentPage} sections={stages} isFinal={isFinal} />
      <div className="home-container">
        {React.createElement(CurrentComponent, props)}
      </div>
      {!isFinal && (
        <Footer
          onBack={handleBack}
          onForward={handleForward}
          canContinue={canContinue()}
          canGoBack={currentPage > 0}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Home;
