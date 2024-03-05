import React, { useRef, useEffect, useState } from "react";
import styles from "./HeaderBar.module.scss";
import UofT from "../../assets/images/uoft_large (1).png";

// use the screen width
import { useScreenWidth } from '../../utils/screenWidth';
// use preset pc width
import { usePCWidth, useHeaderWidth, useIconWidth } from "../../utils/widths";

const HeaderBar = ({ progress, sections }) => {
  const sectionsRefs = useRef(sections.map(() => React.createRef()));
  const logoRef = useRef();

  // screen width
  const screenWidth = useScreenWidth();
  // other widths
  const pcWidth = usePCWidth();
  const headerWidth = useHeaderWidth();
  const iconWidth = useIconWidth();

  const [progressBarX, setProgressBarX] = useState(screenWidth / (sections.length) * (progress + 1));
  const [percentageDone, setPercentageDone] = useState(0);

  // changed progress bar to depend on screen width
  useEffect(() => {
    const calculateProgressBarPosition = () => {
      setPercentageDone((progress + 1) / sections.length * 100);

      // if using pc
      if (screenWidth > pcWidth) {
        const elts = document.getElementsByClassName(styles.section);
        const rects = Array.from(elts).map((elt) => elt.getBoundingClientRect());
        setProgressBarX(rects[progress].x + rects[progress].width);
      }

      // if using mobile
      else {
        setProgressBarX(screenWidth * ((progress + 1) / sections.length));
      }
    };
    window.addEventListener('load', calculateProgressBarPosition);
    return () => window.removeEventListener('load', calculateProgressBarPosition);
  }, [progress, sections, screenWidth]); 
  
  // changed progress bar to depend on screen width
  useEffect(() => {
    // compute the percentage done
    setPercentageDone((progress + 1) / sections.length * 100);

    // if using pc
    if (screenWidth > pcWidth) {
      // align to each section
      const elts = document.getElementsByClassName(styles.section);
      const rects = Array.from(elts).map((elt) => elt.getBoundingClientRect());
      setProgressBarX(rects[progress].x + rects[progress].width);
    }

    // if using mobile
    else {
      setProgressBarX(screenWidth * ((progress + 1) / sections.length));
    }

  }, [progress, sections, screenWidth]);

  return (

    <div className={styles.headerBar}>
      <div ref={logoRef} className={styles.logo}>
        <img src={UofT} alt="University of Toronto logo" />
      </div>

      <div className={styles.sections}>
        {
        
        // check screen width
        screenWidth > 1100
        ?
        sections.map((section, index) => (
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
        :
        sections.map((section, index) => (
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
        <div
            className={`${styles.section} ${
              styles.percentage
            }`}
        >
          { percentageDone.toFixed(0) }%
        </div>
      </div>
        
      {
      <div className={`${styles.progressBarContainer}`}>
        <div
          className={styles.activeBar}
          style={
            screenWidth > pcWidth 
            ?
            { width: `calc(${progressBarX}px)` }
            :
            { width: `calc(${progressBarX}px)` }
          }
        />
        <div
          className={styles.inactiveBar}
          style={
            screenWidth > pcWidth 
            ?
            { width: `calc(100% - ${progressBarX}px)` }
            :
            { width: `calc(100% - ${progressBarX}px)` }
          }
        />
      </div>
      }
    </div>
  );
};

export default HeaderBar;
