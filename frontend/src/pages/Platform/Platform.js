import React, { useState } from "react";
import styles from "./Platform.module.scss";
import { Icon } from "@iconify/react";
import {MdiInstagram} from "../../assets/icons/icons";

const Platform = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const platforms = [
    { id: 1, name: "Facebook", icon: <Icon icon="ic:baseline-facebook" />, colorClass: "facebookColor" },
    { id: 2, name: "Twitter", icon: <Icon icon="mdi:twitter" />, colorClass: "twitterColor" },
    { id: 3, name: "Instagram", icon: <Icon icon="mdi:instagram" />, alternativeIcon: <MdiInstagram />, colorClass: "instagramColor" },
    { id: 4, name: "Reddit", icon: <Icon icon="ic:baseline-reddit" />, colorClass: "redditColor" },
    { id: 5, name: "Snapchat", icon: <Icon icon="mingcute:snapchat-fill" />, colorClass: "snapchatColor" },
    { id: 6, name: "TikTok", icon: <Icon icon="ic:baseline-tiktok" />, colorClass: "tiktokColor" },
  ];

  const handleClick = (platform) => {
    setSelectedPlatform(platform.id); // Update the selected platform based on its id
  };

  return (
    <div>
      <div className={styles.platformContainer}>
        What is your Social Media Platform, choose from below...
      </div>
      <div className={styles.platformContainer}>
        {platforms.map((platform) => (
          <div
            key={platform.id}
            onClick={() => handleClick(platform)}
            className={`${styles.platform} ${selectedPlatform === platform.id ? styles.selected : ""} ${selectedPlatform === platform.id ? styles[platform.colorClass] : ""}`}
          >
            {/* Check if platform is Instagram and it's selected to change the icon */}
            {selectedPlatform === platform.id && platform.id === 3 ? (
              <span className={styles.icon} style={{color: "rgb(69, 69, 69)"}}>{platform.alternativeIcon}</span>
            ) : (
              <span className={styles.icon}>{platform.icon}</span>
            )}
            <span className={styles.platformText}>{platform.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platform;
