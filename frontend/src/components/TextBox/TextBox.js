import React from 'react';
import styles from './TextBox.module.scss';  

const TextBox = ({ text, isSelected, onSelect }) => {
    return (
      <div
        className={`${styles.textBox} ${isSelected ? styles.selected : ''}`}
        onClick={() => onSelect(text)}
      >
        {text} {/* Ensure this matches the prop being passed */}
      </div>
    );
  };

export default TextBox;
