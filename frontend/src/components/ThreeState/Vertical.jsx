import React, { useState, useEffect, useRef } from "react";
import styles from "./Vertical.module.scss";

const Vertical = ({ options, onActiveIndexChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toggleRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({});

  useEffect(() => {
    const optionHeight = toggleRef.current.offsetHeight / options.length;
    const sliderHeight = optionHeight - 20; // Adjust padding or margins as needed
    const topPosition = activeIndex * optionHeight + 10; // Adjust according to your layout
    setSliderStyle({ height: `${sliderHeight}px`, top: `${topPosition}px` });
  }, [activeIndex, options.length]);

  const handleOptionClick = (index) => {
    setActiveIndex(index);
    if (onActiveIndexChange) {
      onActiveIndexChange(index);
    }
  };

  return (
    <div className={`${styles.toggleContainer}`} ref={toggleRef}>
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

export default Vertical;
