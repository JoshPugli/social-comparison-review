import React from "react";
import styles from "./End.module.scss"; // Ensure the correct path is used for the CSS module
import Lottie from "react-lottie";
import animationData from "../../assets/animations/Animation - 1711487741365.json";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const End = () => {
  const location = useLocation();
  // const { selections } = location.state || {};
  // TODO Remove hardcoded selections

  // const [emotionData, setEmotionData] = useState(selections[currentPage] || {
  //   beliefRating: "",
  //   emotion: "",
  //   emotionIntensity: "",
  // });
  const selections = [
    "I'm not good enough",
    {
      beliefRating: "10",
      emotion: "sad",
      emotionIntensity: "10",
    },
    "I failed a test I studied hard for",
    ["All-or-Nothing Thinking"],
    "It is not the end of the world. I can learn from this experience and do better next time.",
    "It is not the end of the world. I can learn from this experience and do better next time.",
  ];
  console.log("Selections:", selections);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.outer}>
    <div className={styles.container}>
      {/* <Lottie options={defaultOptions} height={200} width={200} /> */}
      <div className={styles.header}>
        Let's look back at what you came up with:
      </div>
      <div className={styles.content}>
        <div className={styles.selections}>
          <div className={styles.selection}>
            <span className={styles.colored}>Negative thought I had:</span>{" "}
            {selections[0]}
          </div>
          <div className={styles.selection}>
            <span className={styles.colored}>Emotion I felt:</span>{" "}
            {selections[1].emotion}
          </div>
          <div className={styles.selection}>
            <span className={styles.colored}>Situation I was in:</span>{" "}
            {selections[2]}
          </div>
          <div className={styles.selection}>
            <span className={styles.colored}>
              Thinking trap(s) I identified:
            </span>{" "}
            {selections[3].join(", ")}
          </div>
          <div className={styles.selection}>
            <span className={styles.colored}>Reframe I came up with:</span>{" "}
            {selections[5]}
          </div>
        </div>
      </div>
      <button className={styles.downloadButton}>Download Thought Record</button>
    </div>

    <button className={styles.tryAgain}><Icon style={{marginRight: "5px"}} icon="iconamoon:restart-bold" /> Try this activity again</button>
    </div>
  );
};

export default End;
