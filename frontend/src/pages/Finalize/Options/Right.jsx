import { React, useEffect, useState } from "react";
import styles from "./Right.module.scss";
import Vertical from "../../../components/ThreeState/Vertical";
import NextSteps from "./RightOptions/NextSteps";
import Validation from "./RightOptions/Validation";
import Tailor from "./RightOptions/Tailor";
import EditReframeCard from "../../../components/Card/EditReframeCard";


const Right = ({
  setScrollValue,
  selections,
  reframe,
  setReframe,
  textAreaValue,
  setTextAreaValue,
  setActiveIndex,
}) => {
  const subPages = [Tailor, NextSteps, Validation];
  const [subIndex, setSubIndex] = useState(0);
  const [currElement, setCurrElement] = useState(subPages[subIndex]);
  const [newReframe, setNewReframe] = useState(null);

  const handleAssistanceChoice = (index) => {
    setSubIndex(index);
  };

  useEffect(() => {
    setCurrElement(subPages[subIndex]);
  }, [subIndex]);

  return (
    <div className={styles.assistanceContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.assistanceText}>
          Still fine-tuning your reframe? Let our AI give you a hand! <br />
          <span className={styles.focus}>
            Select how you'd like to enhance your reframe:{" "}
          </span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.leftContent}>
          <Vertical
            options={[
              "Tailor it more closely to my situation",
              "Help me identify next steps and actions",
              "Provide support and validation for my feelings",
            ]}
            onActiveIndexChange={handleAssistanceChoice}
          />
        </div>
        <div className={styles.rightContentContainer}>
          <div className={styles.rightContentUpper}>{currElement}</div>
          <div className={styles.rightContentLower}>
            {newReframe && (
            <EditReframeCard
              reframe={reframe}
              setReframe={setReframe}
              textAreaValue={textAreaValue}
              setTextAreaValue={setTextAreaValue}
              setActiveIndex={setActiveIndex}
            />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;
