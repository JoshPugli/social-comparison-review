import React, { useRef, useEffect, useState } from "react";
import styles from "./HeaderBar.module.scss";
import UofT from "../../assets/images/uoft_large (1).png";

// use the screen width
import { useScreenWidth } from "../../utils/screenWidth";
// use preset pc width
import { usePCWidth, useHeaderWidth, useIconWidth } from "../../utils/widths";

// note: PC Width is default to 1100px

const HeaderBar = ({ progress, sections }) => {
  const sectionsRefs = useRef(sections.map(() => React.createRef()));
  const logoRef = useRef();

  const screenWidth = useScreenWidth();
  const pcWidth = usePCWidth();

  const [progressBarX, setProgressBarX] = useState(
    (screenWidth / sections.length) * (progress + 1)
  );
  const [percentageDone, setPercentageDone] = useState(0);

  useEffect(() => {
    const root = document.documentElement; // Reference to the root element
    root.style.setProperty("--percentage-done", `${percentageDone}, 100`);
  }, [percentageDone]);

  // changed progress bar to depend on screen width
  useEffect(() => {
    const calculateProgressBarPosition = () => {
      setPercentageDone(((progress) / sections.length) * 100);

      // if using pc
      if (screenWidth > pcWidth) {
        const elts = document.getElementsByClassName(styles.section);
        const rects = Array.from(elts).map((elt) =>
          elt.getBoundingClientRect()
        );
        setProgressBarX(rects[progress].x + rects[progress].width);
      }

      // if using mobile
      else {
        setProgressBarX(0);
      }
    };
    window.addEventListener("load", calculateProgressBarPosition);
    return () =>
      window.removeEventListener("load", calculateProgressBarPosition);
  }, [progress, sections, screenWidth, pcWidth]);

  // changed progress bar to depend on screen width
  useEffect(() => {
    // compute the percentage done
    setPercentageDone((progress / sections.length) * 100);

    // if using pc
    if (screenWidth > pcWidth) {
      // align to each section
      const elts = document.getElementsByClassName(styles.section);
      const rects = Array.from(elts).map((elt) => elt.getBoundingClientRect());
      setProgressBarX(rects[progress].x + rects[progress].width);
    }

    // if using mobile
    else {
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
          <text x="18" y="19" dy=".30em" className={styles.percentageText}>
            {percentageDone.toFixed(0)}%
          </text>
        </svg>
      </div>

      <div ref={logoRef} className={styles.logo}>
        <img src={UofT} alt="University of Toronto logo" />
      </div>

      <div className={styles.sections}>
        {
          // check screen width
          screenWidth > 1100
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
              ))
        }
        {/* <div className={`${styles.section} ${styles.percentage}`}>
          {percentageDone.toFixed(0)}%
        </div> */}
      </div>

      {
        <div className={`${styles.progressBarContainer}`}>
          <div
            className={styles.activeBar}
            style={
              screenWidth > pcWidth
                ? { width: `calc(${progressBarX}px)` }
                : { width: `calc(${progressBarX}px)` }
            }
          />
          <div
            className={styles.inactiveBar}
            style={
              screenWidth > pcWidth
                ? { width: `calc(100% - ${progressBarX}px)` }
                : { width: `calc(100% - ${progressBarX}px)` }
            }
          />
        </div>
      }
    </div>
  );
};

export default HeaderBar;
