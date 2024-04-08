import { React, useEffect, useState } from "react";
import styles from "./Right.module.scss";
import Vertical from "../../../components/ThreeState/Vertical";
import NextSteps from "./RightOptions/NextSteps";
import Validation from "./RightOptions/Validation";
import Tailor from "./RightOptions/Tailor";
import EditReframeCard from "../../../components/Card/EditReframeCard";
import LoadingSkeleton from "../../../components/Card/LoadingSkeleton";
import axios from "axios"; // Import axios like this
import { backendURL } from "../../../assets/constants";

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
  const CurrentSubPage = subPages[subIndex];
  const [newReframe, setNewReframe] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  // TODO Remove hardcoded values
  selections[0] = "I am not good enough";
  selections[1] = "I failed a test I studied hard for";
  selections[2] = ["All-or-Nothing Thinking"];
  reframe =
    "It is not the end of the world. I can learn from this experience and do better next time.";

  const handleAssistanceChoice = (index) => {
    setSubIndex(index);
  };

  const getNewReframe = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/update-reframe/`, {
        curr_situation: selections[1],
        curr_thought: selections[0],
        distortions: selections[2],
        current_reframe: reframe,
        user_request: prompt,
      });
      const updatedReframes = [...newReframe];
      updatedReframes[subIndex] = response.data.new_reframe;
      setNewReframe(updatedReframes);
    } catch (error) {
      console.error("Error fetching reframes:", error);
    }
    setLoading(false);
  };

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
          <div className={styles.rightContentUpper}>
            <CurrentSubPage getNewReframe={getNewReframe} />
          </div>
          <div className={styles.rightContentLower}>
            {newReframe[subIndex] && !loading && (
              <EditReframeCard
                title={"Updated Reframe"}
                description={newReframe[subIndex]}
                selected={textAreaValue}
                onClick={setTextAreaValue}
                setActiveIndex={setActiveIndex}
              />
            )}
            {loading && <LoadingSkeleton style={{ width: "90%" }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;
