import React, { useState, useEffect } from "react";
import styles from "./Platform.module.scss";
import { Icon } from "@iconify/react";
import { MdiInstagram } from "../../assets/icons/icons";
import { platforms } from "../../assets/variables";

const Platform = ({ selections, setSelections, currentPage }) => {
  let prev_selection = platforms.find(
    (platform) => platform.name === selections[currentPage]
  );
  const [selectedPlatform, setSelectedPlatform] = useState(prev_selection ? prev_selection.id : null);

  useEffect(() => {
    // Update the selections array whenever the selectedOption changes
    const platform = platforms.find(
      (platform) => platform.id === selectedPlatform
    );
    if (platform) {
      const updatedSelections = [...selections];
      updatedSelections[currentPage] = platform.name; // Assign the platform's name to the current page in selections
      setSelections(updatedSelections);
    }
  }, [selectedPlatform, selections, setSelectedPlatform]);

  const handleClick = (platform) => {
    setSelectedPlatform(platform.id);
  };

  return (
    <div>
      <div className={styles.platformContainer}>
        <h1>Which app below often leaves you feeling negative? </h1>
      </div>
      <div className={styles.platformContainer}>
        {platforms.map((platform) => (
          <div
            key={platform.id}
            onClick={() => handleClick(platform)}
            className={`${styles.platform} ${
              selectedPlatform === platform.id ? styles.selected : ""
            } ${
              selectedPlatform === platform.id
                ? styles[platform.colorClass]
                : ""
            }`}
          >
            {/* Render both icons for Instagram but control visibility */}
            {platform.id === 3 ? (
              <>
                <span
                  className={styles.icon}
                  style={{
                    opacity: selectedPlatform === platform.id ? 0 : 1,
                    transition: "opacity 0.3s ease-out",
                  }}
                >
                  {platform.icon}
                </span>
                <span
                  className={styles.icon}
                  style={{
                    position: "absolute",
                    marginBottom: "55px",
                    opacity: selectedPlatform === platform.id ? 1 : 0,
                    transition: "opacity 0.3s ease-out",
                  }}
                >
                  {platform.alternativeIcon}
                </span>
              </>
            ) : (
              <span className={styles.icon}>{platform.icon}</span>
            )}
            {platform.id === 3 ? (
              <div className={styles.platformTextWrapper}>
                <span
                  className={styles.platformText}
                  style={{
                    opacity: selectedPlatform === platform.id ? 0 : 1,
                    transition: "opacity 0.3s ease-out",
                  }}
                >
                  {platform.name}
                </span>
                <span
                  className={`${styles.platformText} ${styles.instagramGradientText}`}
                  style={{
                    opacity: selectedPlatform === platform.id ? 1 : 0,
                    transition: "opacity 0.3s ease-out",
                  }}
                >
                  {platform.name}
                </span>
              </div>
            ) : (
              <span className={styles.platformText}>{platform.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platform;
