import React, { useState } from "react";
import styles from "./Platform.module.scss";
import { Icon } from "@iconify/react";
import { MdiInstagram } from "../../assets/icons/icons";

const Platform = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const platforms = [
    {
      id: 1,
      name: "Facebook",
      icon: <Icon icon="ic:baseline-facebook" />,
      colorClass: "facebookColor",
    },
    {
      id: 2,
      name: "Twitter",
      icon: <Icon icon="mdi:twitter" />,
      colorClass: "twitterColor",
    },
    {
      id: 3,
      name: "Instagram",
      icon: <Icon icon="mdi:instagram" />,
      alternativeIcon: <MdiInstagram />,
      colorClass: "instagramColor",
    },
    {
      id: 4,
      name: "Reddit",
      icon: <Icon icon="ic:baseline-reddit" />,
      colorClass: "redditColor",
    },
    {
      id: 5,
      name: "TikTok",
      icon: <Icon icon="ic:baseline-tiktok" />,
      colorClass: "tiktokColor",
    },
    {
        id: 6,
        name: "LinkedIn",
        icon: <Icon icon="mdi:linkedin" />,
        colorClass: "linkedinColor",
    }
  ];

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
