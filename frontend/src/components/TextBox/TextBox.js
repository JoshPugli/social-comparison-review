import React from 'react';
import styles from './TextBox.module.scss'; // Your existing styles

const TextBox = ({ text, isSelected, onSelect }) => {
    // Make sure you're using `text` prop here to display the content
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
