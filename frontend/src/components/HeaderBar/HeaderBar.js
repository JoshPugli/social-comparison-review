import React, { useRef, useEffect, useState } from "react";
import styles from "./HeaderBar.module.scss";
import UofT from "../../assets/images/uoft_large (1).png";

// use the screen width
import { useScreenWidth } from "../../utils/screenWidth";
// use preset pc width
import { usePCWidth, useHeaderWidth, useIconWidth } from "../../utils/widths";

// note: PC Width is default to 1100px

const HeaderBar = ({ progress, sections, isFinal }) => {
  const sectionsRefs = useRef(sections.map(() => React.createRef()));
  const logoRef = useRef();

  const screenWidth = useScreenWidth();
  const pcWidth = usePCWidth();

  const [progressBarX, setProgressBarX] = useState(
    (screenWidth / sections.length) * (progress + 1)
  );
  const [percentageDone, setPercentageDone] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--percentage-done", `${percentageDone}, 100`);
  }, [percentageDone]);

  useEffect(() => {
    if (isFinal) {
      setPercentageDone(100);
    }
  }, [isFinal]);

  useEffect(() => {
    const calculateProgressBarPosition = () => {
      setPercentageDone((progress / sections.length) * 100);
      if (screenWidth > pcWidth) {
        const elts = document.getElementsByClassName(styles.section);
        const rects = Array.from(elts).map((elt) =>
          elt.getBoundingClientRect()
        );
        setProgressBarX(rects[progress].x + rects[progress].width);
      } else {
        setProgressBarX(0);
      }
    };
    window.addEventListener("load", calculateProgressBarPosition);
    return () =>
      window.removeEventListener("load", calculateProgressBarPosition);
  }, [progress, sections, screenWidth, pcWidth]);

  useEffect(() => {
    setPercentageDone((progress / sections.length) * 100);
    if (screenWidth > pcWidth) {
      const elts = document.getElementsByClassName(styles.section);
      const rects = Array.from(elts).map((elt) => elt.getBoundingClientRect());
      setProgressBarX(rects[progress].x + rects[progress].width);
    } else {
      setProgressBarX(0);
    }
  }, [progress, sections, screenWidth, pcWidth]);

  return (
    <div className={styles.headerBar}>
      <div className={styles.circularProgressContainer}>
        <svg className={styles.circularProgress} viewBox="0 0 36 36">
          <path
            className={styles.bg}
            d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={styles.progress}
            d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
            style={{ strokeDasharray: `var(--percentage-done), 100` }}
          />
          <text x="18" y="19" className={styles.percentageText}>
            {percentageDone.toFixed(0)}%
          </text>
        </svg>
      </div>

      <div ref={logoRef} className={styles.logo}>
        <img src={UofT} alt="University of Toronto logo" />
      </div>

      <div className={`${styles.sections} ${isFinal ? styles.fadeOut : ""}`}>
        {screenWidth > 1100
          ? sections.map((section, index) => (
              <div
                key={index}
                ref={sectionsRefs.current[index]}
                className={`${styles.section} ${
                  index <= progress ? styles.active : styles.inactive
                }`}
              >
                {String(index + 1).padStart(2, "0")}. {section}
              </div>
            ))
          : sections.map((section, index) => (
              <div
                key={index}
                ref={sectionsRefs.current[index]}
                className={`${styles.section} ${
                  index === progress ? styles.active : styles.inactive
                }`}
              >
                {String(index + 1).padStart(2, "0")}. {section}
              </div>
            ))}
      </div>

        <div
          className={styles.thankYouText + " " + (isFinal ? styles.fadeIn : "")}
        >
          Thanks for participating 👋
        </div>

      {
        <div className={`${styles.progressBarContainer}`}>
          <div
            className={styles.activeBar}
            style={{
              width: isFinal
                ? "100%"
                : screenWidth > pcWidth
                ? `calc(${progressBarX}px)`
                : `calc(${progressBarX}px)`,
            }}
          />
          <div
            className={styles.inactiveBar}
            style={{
              width: isFinal
                ? "0%"
                : screenWidth > pcWidth
                ? `calc(100% - ${progressBarX}px)`
                : `calc(100% - ${progressBarX}px)`,
            }}
          />
        </div>
      }
    </div>
  );
};

export default HeaderBar;
