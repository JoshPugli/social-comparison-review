import React, { useEffect, useState } from "react";
import styles from "./Finalize.module.scss";
import ThreeStateToggle from "../../components/ThreeState/ThreeStateToggle";
import Middle from "./Options/Middle";
import Left from "./Options/Left";
import Right from "./Options/Right";

const Finalize = ({ selections, setSelections, currentPage }) => {
  const [reframe, setReframe] = useState(selections[currentPage - 1]);
  const [textAreaValue, setTextAreaValue] = useState(reframe);
  const [activeIndex, setActiveIndex] = useState(1);
  const optionText = [
    "Edit Your Reframe",
    "Finish Reframing and Submit",
    "Get Additional AI Assistance",
  ];
  const optionPages = [Left, Middle, Right];
  const [canScroll, setCanScroll] = useState(true);
  selections[4] = "It is going to be okay!";

  useEffect(() => {
    if (activeIndex !== 1) {
      let selectionsCopy = [...selections];
      selectionsCopy[currentPage] = null;
      setSelections(selectionsCopy);
    } else {
      let selectionsCopy = [...selections];
      selectionsCopy[currentPage] = reframe;
      setSelections(selectionsCopy);
    }
  }, [activeIndex]);

  const handleActiveIndexChange = (index) => {
    setActiveIndex(index);
  };

  const setScrollValue = (value) => {
    setCanScroll(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>You're almost there!</h1>
      </div>
      <ThreeStateToggle
        options={optionText}
        canScroll={canScroll}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onActiveIndexChange={handleActiveIndexChange}
      />
      {React.createElement(optionPages[activeIndex], {
        setScrollValue,
        selections,
        reframe,
        setReframe,
        textAreaValue,
        setTextAreaValue,
        setActiveIndex,
      })}
    </div>
  );
};

export default Finalize;
