import React, { useState, useEffect } from "react";
import styles from "./Distortions.module.scss";
import DistortionCard from "../../components/DistortionCard/DistortionCard";
import DistortionLoadingCard from "../../components/DistortionCard/DistortionLoadingCard";
import { distortions, distortionDescriptions } from "../../assets/constants";
import { capitalizeWords } from "../../assets/utils";
import { backendURL, frontendURL } from "../../assets/constants";
import axios from "axios";

const Distortion = ({ selections, setSelections, currentPage, thought, situation }) => {
  const [distortions, setDistortions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistortions, setSelectedDistortions] = useState([]);
  console.log("ULR:", `${backendURL}/distortions/`);

  useEffect(() => {
    axios.post(`${backendURL}/distortions/`, {
      curr_situation: selections[0], // Assuming `situation` holds the current situation
      curr_thought: selections[2], // Assuming `thought` holds the current thought
    })
    .then((response) => {
      console.log(response.data);
      setDistortions(response.data.distortions); // Adjust according to the response structure
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching distortions:", error);
    });
  }, []);

  // useEffect(() => {
  //   const updatedSelections = [...selections];
  //   updatedSelections[currentPage] = selectedDistortions;
  //   setSelections(updatedSelections);
  // }, [selectedDistortions, currentPage, setSelections, selections]);

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
      </div>
      <div className={styles.distortions}>
        {loading
          ? Array(3) // Assuming you want to display 3 loading cards
              .fill()
              .map((_, index) => <DistortionLoadingCard key={index} />)
          : distortions.map((distortion, index) => (
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
