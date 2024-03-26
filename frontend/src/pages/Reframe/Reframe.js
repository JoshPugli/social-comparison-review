import React, { useState, useRef, useEffect } from "react";
import styles from "./Reframe.module.scss";
import axios from "axios";
import LoadingSkeleton from "../../components/Card/LoadingSkeleton";
import { backendURL, frontendURL } from "../../assets/constants";
import Card from "../../components/Card/Card";

const Reframe = ({
  selections,
  setSelections,
  currentPage,
  thought,
  situation,
  distortions,
}) => {
  const [reframes, setReframes] = useState({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .post(`${backendURL}/reframes/`, {
        curr_situation: situation,
        curr_thought: thought,
        distortions: distortions,
      })
      .then((response) => {
        console.log(response.data);
        setReframes(response.data.reframes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reframes:", error);
      });
  }, []);

  useEffect(() => {
    const updatedSelections = [...selections];
    updatedSelections[currentPage] = selected;
    setSelections(updatedSelections);
  }, [selected]);

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>Reframe Your Thinking</h1>
        <div className={styles.subHeader}>
          Here are a few reframes you may consider. Click on the reframe you
          find most relatable and helpful to start working on it or add your own
          reframe.
        </div>
        {loading && (
          <div className={styles.highlight}>
            {" "}
            <span className="font-bold">Note</span>: Reframing suggestions may
            take up to 30 seconds to load{" "}
          </div>
        )}
      </div>
      <div className={styles.reframes}>
        {loading
          ? Array(4)
              .fill()
              .map((_, index) => <LoadingSkeleton key={index} />)
          : Object.values(reframes).map((reframe, index) => (
              <Card
                key={index}
                title={""}
                description={reframe}
                selected={index === selected}
                onClick={() => setSelected(index)} // Corrected this line
                isReframe={true}
              />
            ))}
      </div>
    </div>
  );
};

export default Reframe;
