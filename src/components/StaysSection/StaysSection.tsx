import React from 'react';
import { Button } from 'rsuite';
import type { StayItem } from '../../types/StaysSection.types';
import siteData from '../../data/booksitedata.json';
import styles from './StaysSection.module.scss';

const STAYS_DATA: StayItem[] = siteData.stayCategories;

export const StaysSection: React.FC = () => {
  return (
    <section id="stays" className={styles.staysSection}>
      <div className="container">
        <div className={styles.sectionHead}>
          <div className={styles.sectionKicker}>Tailored Accommodations</div>
          <h2 className={styles.sectionTitle}>Designed for every type of stay</h2>
          <p className={styles.sectionDesc}>
            Whether you are staying for weeks, months or accompanying family for medical care, we provide homely comfort and convenience.
          </p>
        </div>

        <div className={styles.staysGrid}>
          {STAYS_DATA.map((item, index) => (
            <article key={index} className={styles.stayCard}>
              <div className={styles.stayImg}>
                <img src={item.image} alt={item.title} />
                <span className={styles.tag}>{item.tag}</span>
              </div>
              <div className={styles.stayBody}>
                <h3 className={styles.stayTitle}>{item.title}</h3>
                <p className={styles.stayText}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.stayBookCta}>
          <Button
            as="a"
            href="#contact"
            className={styles.bookStayBtn}
            size="lg"
          >
            Book Your Stay Now &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StaysSection;
