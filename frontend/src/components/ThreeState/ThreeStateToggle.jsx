import React, { useState, useEffect, useRef } from 'react';
import styles from './ThreeStateToggle.module.scss';

const ThreeStateToggle = ({ options, onActiveIndexChange }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const toggleRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({});

  useEffect(() => {
    const optionWidth = toggleRef.current.offsetWidth / options.length;
    const sliderWidth = optionWidth - 40; // Adjust padding or margins as needed
    const leftPosition = activeIndex * optionWidth + 20; // Adjust according to your layout
    setSliderStyle({ width: `${sliderWidth}px`, left: `${leftPosition}px` });
  }, [activeIndex, options.length]);

  const handleOptionClick = (index) => {
    setActiveIndex(index);
    if (onActiveIndexChange) {
      onActiveIndexChange(index);
    }
  };

  return (
    <div className={styles.toggleContainer} ref={toggleRef}>
      <div className={styles.slider} style={sliderStyle}></div>
      {options.map((option, index) => (
        <div
          key={option}
          className={`${styles.toggleOption} ${index === activeIndex ? styles.optionActive : ''}`}
          onClick={() => handleOptionClick(index)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default ThreeStateToggle;
