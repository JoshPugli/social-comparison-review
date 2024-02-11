import React from 'react';
import styles from './Footer.module.scss'; 
import { EpBack } from '../../assets/icons/icons'; 
import { Icon } from '@iconify/react';

const Footer = ({ onBack, onForward }) => {
    
  return (
    <div className={styles.footer}>
      <button className={styles.backButton} onClick={onBack}><Icon icon="ph:arrow-left-bold" /> Back</button>
      <button className={styles.forwardButton} onClick={onForward}>Forward <Icon icon="ph:arrow-right-bold" /></button>
    </div>
  );
};

export default Footer;
