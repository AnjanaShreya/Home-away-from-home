import React from 'react';
import { Button } from 'rsuite';
import styles from './ContactSection.module.scss';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <div className={styles.enquireCard}>
          <div className={styles.cardLeft}>
            <div className={styles.kicker}>PLANNING A STAY?</div>
            <h2 className={styles.heading}>
              Tell us what you need.<br />We’ll help you find the right fit.
            </h2>
            <p className={styles.subtitle}>
              Share your dates, preferred location and reason for stay.
            </p>
          </div>

          <div className={styles.cardRight}>
            <Button
              as="a"
              href="https://homeawayfromhome.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.enquireBtn}
            >
              Enquire About a Stay &rarr;
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
