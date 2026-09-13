import React from 'react';
import { Button } from 'rsuite';
import type { HeroProps } from '../../types/Hero.types';
import styles from './Hero.module.scss';

export const Hero: React.FC<HeroProps> = () => {
  return (
    <main id="hero" className={styles.hero}>
      <div className={styles.slideOverlay}></div>
      <div
        className={`${styles.slideBg} ${styles.slide1}`}
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80")',
        }}
      ></div>
      <div
        className={`${styles.slideBg} ${styles.slide2}`}
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1920&q=80")',
        }}
      ></div>
      <div
        className={`${styles.slideBg} ${styles.slide3}`}
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1920&q=80")',
        }}
      ></div>

      <div className={styles.heroContent}>
        <div className={styles.eyebrow}>• SERVICED APARTMENTS · HYDERABAD</div>
        <h1 className={styles.title}>
          Stay Longer.<br />Feel at Home.
        </h1>
        <p className={styles.subtitle}>
          Fully furnished serviced apartments designed for extended stays,
          business travel and medical-related stays in Hyderabad.
        </p>

        <div className={styles.heroActions}>
          <Button
            as="a"
            href="#tariffs"
            className={styles.btnPrimary}
            size="lg"
          >
            View Rooms &amp; Tariffs
          </Button>
          <Button
            as="a"
            href="#contact"
            className={styles.btnGhost}
            size="lg"
          >
            Talk to Us
          </Button>
        </div>

        <div className={styles.heroNote}>
          <span><i></i> Fully Furnished</span>
          <span><i></i> Flexible Stays</span>
          <span><i></i> Housekeeping Support</span>
          <span><i></i> Prime Hyderabad Location</span>
        </div>
      </div>
    </main>
  );
};

export default Hero;
