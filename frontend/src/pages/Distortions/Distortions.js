import React, { useState, useEffect } from "react";
import styles from "./Distortions.module.scss";
import DistortionCard from "../../components/DistortionCard/DistortionCard";
import DistortionLoadingCard from "../../components/DistortionCard/DistortionLoadingCard";
import { distortions, distortionDescriptions } from "../../assets/constants";
import { capitalizeWords } from "../../assets/utils";
import { backendURL, frontendURL } from "../../assets/constants";
import axios from "axios";

const mockFetchDistortions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["all-or-nothing thinking", "overgeneralizing", "mind reading"]);
    }, 2000); 
  });
};

const Distortion = ({ selections, setSelections, currentPage }) => {
  const [distortions, setDistortions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistortions, setSelectedDistortions] = useState([]);
  const isMock = true;
  // const thought = selections[0];
  // const situation = selections[2];

  useEffect(() => {
    if (isMock) {
      mockFetchDistortions().then((data) => {
        console.log(data);
        setDistortions(data);
        setLoading(false);
      });
    } else { 
      axios.get(`${backendURL}/distortions`).then((response) => {
        console.log(response.data);
        setDistortions(response.data);
        setLoading(false);
      });
    }
  }, []);

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
