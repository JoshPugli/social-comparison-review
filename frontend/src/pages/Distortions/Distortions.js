import React, { useState, useEffect } from "react";
import styles from "./Distortions.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DistortionCard from "../../components/DistortionCard/DistortionCard";
import { distortions, distortionDescriptions } from "../../assets/constants";
import { capitalizeWords } from "../../assets/utils";


const fetchDistortions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["all-or-nothing thinking", "overgeneralizing", "mind reading"]);
    }, 0); // Simulating a network request
  });
};


const Distortion = () => {
  const [distortions, setDistortions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistortions().then((data) => {
      console.log(data);
      setDistortions(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Distortions</h1>
      <div className={styles.distortions}>
        {distortions.map((distortion, index) => (
          <DistortionCard
            key={index}
            distortion={capitalizeWords(distortion)}
            selected={false}
            distortionDescription={distortionDescriptions[distortion]}
          />
        ))}
      </div>
    </div>
  );
};

export default Distortion;
