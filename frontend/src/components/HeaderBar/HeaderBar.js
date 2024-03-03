import React, { useRef, useEffect, useState } from "react";
import styles from "./HeaderBar.module.scss";
import UofT from "../../assets/images/uoft_large (1).png";
import { useScreenWidth } from "../../utils/ScreenWidth";

const HeaderBar = ({ progress, sections }) => {
  const sectionsRefs = useRef(sections.map(() => React.createRef()));
  const logoRef = useRef();

  // get the screen width
  const screenWidth = useScreenWidth();

  const [progressBarX, setProgressBarX] = useState(screenWidth / (sections.length) * (progress + 1));

  // changed progress bar to depend on screen width
  useEffect(() => {
    const calculateProgressBarPosition = () => {
      // const elts = document.getElementsByClassName(styles.section);
      // const rects = Array.from(elts).map((elt) => elt.getBoundingClientRect());
      // setProgressBarX(rects[progress].x + rects[progress].width);

      setProgressBarX(screenWidth / (sections.length) * (progress + 1));
    };
    window.addEventListener('load', calculateProgressBarPosition);
    return () => window.removeEventListener('load', calculateProgressBarPosition);
  }, [screenWidth, progress, sections]); 
  
  // changed progress bar to depend on screen width
  useEffect(() => {
    // const elts = document.getElementsByClassName(styles.section);
    // const rects = Array.from(elts).map((elt) => elt.getBoundingClientRect());

    setProgressBarX(screenWidth / (sections.length) * (progress + 1));
  }, [progress, sections, screenWidth]);

  return (
    <div className={styles.headerBar}>

      <div ref={logoRef} className={styles.logo}>
        <img src={UofT} alt="University of Toronto logo" />
      </div>

      <div className={`${styles.sections}`}>
        {
          screenWidth > 999 
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
      </div>

      <div className={`${styles.progressBarContainer}`}>
        <div
          className={styles.activeBar}
          style={
            screenWidth > 999 
            ?
            { width: `calc(${progressBarX}px)` }
            :
            { width: `calc(${progressBarX}px)` }
          }
        />
        <div
          className={styles.inactiveBar}
          style={
            screenWidth > 999 
            ?
            { width: `calc(100% - ${progressBarX}px)` }
            :
            { width: `calc(100% - ${progressBarX}px)` }
          }
        />
      </div>
    </div>
  );
};

export default HeaderBar;
