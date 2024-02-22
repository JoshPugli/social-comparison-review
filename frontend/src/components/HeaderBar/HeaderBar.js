import React, { useRef, useEffect, useState } from "react";
import styles from "./HeaderBar.module.scss";
import UofT from "../../assets/images/uoft_large (1).png";

const HeaderBar = ({ progress, sections }) => {
  const sectionsRefs = useRef(sections.map(() => React.createRef()));
  const logoRef = useRef();
  const [progressBarX, setProgressBarX] = useState(0);

  useEffect(() => {
    const calculateProgressBarPosition = () => {
      const elts = document.getElementsByClassName(styles.section);
      const rects = Array.from(elts).map((elt) => elt.getBoundingClientRect());
      setProgressBarX(rects[progress].x + rects[progress].width);
    };
    window.addEventListener('load', calculateProgressBarPosition);
    return () => window.removeEventListener('load', calculateProgressBarPosition);
  }, []); 
  
  useEffect(() => {
    const elts = document.getElementsByClassName(styles.section);
    const rects = Array.from(elts).map((elt) => elt.getBoundingClientRect());
    setProgressBarX(rects[progress].x + rects[progress].width);
  }, [progress, sections]);

  return (
    <div className={styles.headerBar}>
      <div ref={logoRef} className={styles.logo}>
        <img src={UofT} alt="University of Toronto logo" />
      </div>
      <div className={styles.sections}>
        {sections.map((section, index) => (
          <div
            key={index}
            ref={sectionsRefs.current[index]}
            className={`${styles.section} ${
              index <= progress ? styles.active : styles.inactive
            }`}
          >
            {String(index + 1).padStart(2, "0")}. {section}
          </div>
        ))}
      </div>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.activeBar}
          style={{ width: `${progressBarX}px` }}
        />
        <div
          className={styles.inactiveBar}
          style={{
            width: `calc(100% - ${progressBarX}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default HeaderBar;
