import React, { useState, useEffect } from "react";
import styles from "./Emotion.module.scss";
import NumberBox from "../../components/NumberBox/NumberBox";
import TextField from "@material-ui/core/TextField";

const Emotion = ({ selections, setSelections, currentPage }) => {
  const [emotionData, setEmotionData] = useState(selections[currentPage] || {
    beliefRating: "",
    emotion: "",
    emotionIntensity: "",
  });

  // Update local state and global selections when any of the inputs change
  const handleInputChange = (key, value) => {
    const updatedEmotionData = { ...emotionData, [key]: value };
    setEmotionData(updatedEmotionData);

    // Update the global selections state with the new emotion data
    const updatedSelections = [...selections];
    updatedSelections[currentPage] = updatedEmotionData;
    setSelections(updatedSelections);
  };

  // Render number boxes for a given key (beliefRating or emotionIntensity)
  const renderNumberBoxes = (key) => {
    return Array.from({ length: 10 }, (_, i) => (
      <NumberBox
        key={i + 1}
        value={i + 1}
        selectedValue={emotionData[key]}
        onClick={(value) => handleInputChange(key, value)}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h1>On a scale from 1 to 10, how strongly do you believe the thought: <span style={{color: "#007FA3"}}>"{selections[0]}"</span>?</h1>
          <div className={styles.subheader}>1: Do not believe; 10: Strongly believe</div>
          <div className={styles.numberBoxes}>
            {renderNumberBoxes("beliefRating")}
          </div>
        </div>

        <div className={styles.column}>
          <h1>What emotion does this thought make you feel?</h1>
          <div className={styles.subheader}>e.g., scared, ashamed, stressed, discouraged</div>
          <TextField
            id="emotion-input"
            label="Type your emotion here..."
            variant="outlined"
            fullWidth
            value={emotionData.emotion}
            style={{ width: "95%"}}
            onChange={(e) => handleInputChange("emotion", e.target.value)}
          />
        </div>

        <div className={styles.column}>
          <h1>On a scale from 1 to 10, how strong is this emotion <span style={{color: "#007FA3"}}>{emotionData.emotion ? `(${emotionData.emotion})` : ""}</span>?</h1>
          <div className={styles.subheader}>1: Not strong; 10: Extremely strong</div>
          <div className={styles.numberBoxes}>
            {renderNumberBoxes("emotionIntensity")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emotion;
