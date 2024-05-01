import React, { useState, useEffect, useRef } from "react";
import styles from "./Distortions.module.scss";
import Card from "../../components/Card/Card";
import LoadingSkeleton from "../../components/Card/LoadingSkeleton";
import { distortions, distortionDescriptions } from "../../assets/constants";
import { capitalizeWords } from "../../assets/utils";
import { backendURL, frontendURL } from "../../assets/constants";
import axios from "axios";
import { Icon } from "@iconify/react";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Distortion = ({
  selections,
  setSelections,
  currentPage,
  thought,
  situation,
}) => {
  const [generatedDistortions, setDistortions] = useState([]);
  const [probabilities, setProbabilities] = useState([]);
  let initialDistortions = [];
  let remainingDistortions = [];
  if (probabilities.length > 0) {
    initialDistortions = probabilities.slice(0,4)
    remainingDistortions = probabilities.slice(4)
  }

  const [loading, setLoading] = useState(true);
  const [selectedDistortions, setSelectedDistortions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const doMockCall = false;
  const called = useRef(false);


  useEffect(() => {
    if (doMockCall) {
      sleep(1000).then(() => {
        setDistortions(["catastrophizing", "personalizing", "mind reading"]);
        setLoading(false);
      });
    } else if (situation && thought && !called.current) {
      called.current = true;
      axios
        .post(`${backendURL}/distortions/`, {
          curr_situation: situation,
          curr_thought: thought,
        })
        .then((response) => {
          setLoading(false);
          console.log("Recieved distortion data from backend:", response.data);
          setDistortions(response.data.distortions);
          setProbabilities(response.data.label_probabilities);
        })
        .catch((error) => {
          console.error("Error fetching distortions:", error);
          setLoading(false);
        });
    }
  }, [situation, thought]);

  useEffect(() => {
    const updatedSelections = [...selections];
    updatedSelections[currentPage] = selectedDistortions;
    setSelections(updatedSelections);
  }, [selectedDistortions]);

  const handleCardClick = (distortion) => {
    setSelectedDistortions((prevSelected) => {
      const isSelected = prevSelected.includes(distortion);
      if (isSelected) {
        return prevSelected.filter((d) => d !== distortion);
      } else {
        return prevSelected.length < 3
          ? [...prevSelected, distortion]
          : prevSelected;
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.infoHeader}>
            <Icon icon="icon-park-outline:info" className={styles.infoIcon} />
            What is a thinking trap?
          </div>
          <div className={styles.infoText} style={{ marginBottom: "1rem" }}>
            Our negative thinking often falls into common patterns, called
            "thinking traps." We can learn to recognize when we're getting stuck
            in a thinking trap. This gives us more power over our negative
            thoughts.
          </div>
          <div className={styles.infoText}>
            Common thinking traps include: assuming what others think (“Mind
            reading”), thinking in extremes (“All-or-nothing thinking”),
            focusing on the worst-case scenario (“Catastrophizing”), focusing
            only on the bad (“Disqualifying the positive”), etc.
          </div>
        </div>
        <h1>Select the Thinking Trap</h1>
        <div className={styles.subHeader}>
          Select the thinking trap(s) that you most relate to.
          <br />{" "}
          <span className={styles.highlight}>
            <span className="font-bold">Note</span>: You may select more than
            one thinking traps (up to three)
          </span>
        </div>
        {!loading && doMockCall && (
          <div className="text-red-500 text-2xl font-bold">
            NOTE: This is a mocked call. To generate real data, set
            doMockCall=false in Distortions.js
          </div>
        )}
        {loading === true ||
          (generatedDistortions.length > 0 && (
            <div className={styles.descriptiveText}>
              Thinking traps we think you might be falling for:
            </div>
          ))}
      </div>
      <div className={styles.distortions}>
        {loading
          ? Array(4) // Assuming you want to display 3 loading cards
              .fill()
              .map((_, index) => <LoadingSkeleton key={index} />)
          : initialDistortions.map((tuple, index) => (
              <Card
                key={index}
                title={(tuple[0])}
                selected={selectedDistortions.includes(tuple[0])}
                description={distortionDescriptions[tuple[0]]}
                onClick={() => handleCardClick(tuple[0])}
                probability={tuple[1]}
              />
            ))}
      </div>
      <div className={styles.headingContainer}>
        {!loading && (
          <div className={styles.showMore} onClick={() => setShowAll(!showAll)}>
            {!showAll ? (
              <>
                <Icon
                  icon="iconamoon:sign-plus-bold"
                  className={styles.pmIcon}
                />
                Show addional thinking traps{" "}
              </>
            ) : (
              <>
                {" "}
                <Icon
                  icon="iconamoon:sign-minus-bold"
                  className={styles.pmIcon}
                />
                Hide addional thinking traps
              </>
            )}
          </div>
        )}
      </div>
      <div className={styles.distortions}>
        {showAll &&
          remainingDistortions.map((tuple, index) => (
            <Card
              key={index}
              title={capitalizeWords(tuple[0])}
              selected={selectedDistortions.includes(tuple[0])}
              description={distortionDescriptions[tuple[0]]}
              onClick={() => handleCardClick(tuple[0])}
              probability={tuple[1]}
            />
          ))}
      </div>
    </div>
  );
};

export default Distortion;
