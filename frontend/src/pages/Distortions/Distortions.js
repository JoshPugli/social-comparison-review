import React, { useState, useEffect } from "react";
import styles from "./Distortions.module.scss";
import DistortionCard from "../../components/DistortionCard/DistortionCard";
import LoadingSkeleton from "../../components/DistortionCard/LoadingSkeleton";
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
  const [loading, setLoading] = useState(true);
  const [selectedDistortions, setSelectedDistortions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const doMockCall = true; // TODO: set to true to use a mock call

  const remainingDistortions = distortions.filter(
    (distortion) =>
      !generatedDistortions
        .map((d) => d.toLowerCase())
        .includes(distortion.toLowerCase())
  );

  useEffect(() => {
    if (doMockCall) {
      sleep(1000).then(() => {
        setDistortions(["catastrophizing", "personalizing", "mind reading"]);
        setLoading(false);
      });
    } else {
      axios
        .post(`${backendURL}/distortions/`, {
          curr_situation: situation,
          curr_thought: thought,
        })
        .then((response) => {
          console.log(response.data);
          setDistortions(response.data.distortions);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching distortions:", error);
        });
    }
  }, []);

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
        {!loading && generatedDistortions.length === 0 && (
          <div className={styles.descriptiveText}>
            We could not find thinking traps associated with your thought <br />{" "}
            Expand all options below:
          </div>
        )}
      </div>
      <div className={styles.distortions}>
        {loading
          ? Array(3) // Assuming you want to display 3 loading cards
              .fill()
              .map((_, index) => <LoadingSkeleton key={index} />)
          : generatedDistortions.map((distortion, index) => (
              <DistortionCard
                key={index}
                distortion={capitalizeWords(distortion)}
                selected={selectedDistortions.includes(distortion)}
                distortionDescription={distortionDescriptions[distortion]}
                onClick={() => handleCardClick(distortion)}
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
          remainingDistortions.map((distortion, index) => (
            <DistortionCard
              key={index}
              distortion={capitalizeWords(distortion)}
              selected={selectedDistortions.includes(distortion)}
              distortionDescription={distortionDescriptions[distortion]}
              onClick={() => handleCardClick(distortion)}
            />
          ))}
      </div>
    </div>
  );
};

export default Distortion;
