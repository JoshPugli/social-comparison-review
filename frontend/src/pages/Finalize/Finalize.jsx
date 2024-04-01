import React, { useEffect, useState } from "react";
import styles from "./Finalize.module.scss";
import ThreeStateToggle from "../../components/ThreeState/ThreeStateToggle";
import Middle from "./Options/Middle";
import Left from "./Options/Left";
import Right from "./Options/Right";

const Finalize = ({ selections, setSelections, currentPage }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [reframe, setReframe] = useState(selections[currentPage - 1]);
  const [textAreaValue, setTextAreaValue] = useState(reframe);
  const [activeIndex, setActiveIndex] = useState(1);
  const optionText = [
    "Edit Your Reframe",
    "Finish Reframing and Continue",
    "Get Additional AI Assistance",
  ];
  const optionPages = [Left, Middle, Right];

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

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>You're almost there!</h1>
      </div>
      <ThreeStateToggle
        options={optionText}
        onActiveIndexChange={handleActiveIndexChange}
      />
      {React.createElement(optionPages[activeIndex], {
        isEditable,
        setIsEditable,
        selections,
        reframe,
        setReframe,
        textAreaValue,
        setTextAreaValue,
      })}
    </div>
  );
};

export default Finalize;
