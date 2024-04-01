import React, { useState, useEffect, useRef } from "react";
import styles from "./ThreeStateToggle.module.scss";

const ThreeStateToggle = ({ options, canScroll, activeIndex, setActiveIndex, onActiveIndexChange }) => {
  const toggleRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({});

  useEffect(() => {
    const optionWidth = toggleRef.current.offsetWidth / options.length;
    const sliderWidth = optionWidth - 40; // Adjust padding or margins as needed
    const leftPosition = activeIndex * optionWidth + 20; // Adjust according to your layout
    setSliderStyle({ width: `${sliderWidth}px`, left: `${leftPosition}px` });
  }, [activeIndex, options.length]);

  const handleOptionClick = (index) => {
    if (!canScroll) {
      return;
    }
    setActiveIndex(index);
    if (onActiveIndexChange) {
      onActiveIndexChange(index);
    }
  };

  return (
    <div className={`${styles.toggleContainer} ${canScroll ? '' : styles.disabled}`} ref={toggleRef}>
      <div className={styles.slider} style={sliderStyle}></div>
      {options.map((option, index) => (
        <div
          key={option}
          className={`${styles.toggleOption} ${
            index === activeIndex ? styles.optionActive : ""
          }`}
          onClick={() => handleOptionClick(index)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default ThreeStateToggle;
