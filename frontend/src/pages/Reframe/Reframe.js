import React, { useState, useRef } from "react";
import styles from "./Reframe.module.scss";
import axios from "axios";
import LoadingSkeleton from "../../components/DistortionCard/LoadingSkeleton";

const Reframe = () => {
  const [reframes, setReframes] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>Reframe Your Thinking</h1>
        <div className={styles.subHeader}>
          Here are a few reframes you may consider. Click on the reframe you
          find most relatable and helpful to start working on it or add your own
          reframe.
        </div>
        {loading && <div className={styles.highlight}> <span className="font-bold">Note</span>: Reframing suggestions may take up to 30 seconds to load </div>}
      </div>
      <div className={styles.reframes}>
        {loading &&
          Array(3) // Assuming you want to display 3 loading cards
            .fill()
            .map((_, index) => <LoadingSkeleton key={index} />)}
      </div>
    </div>
  );
};

export default Reframe;
