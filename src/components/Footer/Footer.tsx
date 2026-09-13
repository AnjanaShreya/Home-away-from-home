import React from 'react';
import type { FooterProps } from '../../types/Footer.types';
import styles from './Footer.module.scss';

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div>
          <strong>Home Away From Home</strong> · Serviced Apartments in Hyderabad
        </div>
        <div>
          Extended Stays · Business Stays · Medical-Related Stays
        </div>
      </div>
    </footer>
  );
};

export default Footer;
