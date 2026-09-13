import React from 'react';
import type { AmenityItem } from '../../types/Amenities.types';
import siteData from '../../data/booksitedata.json';
import styles from './Amenities.module.scss';

const ICONS_MAP: Record<string, React.ReactNode> = {
  kitchen: (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 8V21M6 8v13M6 4a2 2 0 0 1 4 0v4H6V4zm12 0a2 2 0 0 1 4 0v4h-4V4z"></path>
    </svg>
  ),
  work: (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  ),
  comfort: (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9M10 8v9"></path>
    </svg>
  ),
  support: (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
    </svg>
  ),
};

const AMENITIES: AmenityItem[] = siteData.amenities.map((item) => ({
  title: item.title,
  description: item.description,
  icon: ICONS_MAP[item.id] || null,
}));

export const Amenities: React.FC = () => {
  return (
    <section id="amenities" className={styles.amenities}>
      <div className="container">
        <div className={styles.sectionHead}>
          <div className={styles.sectionKicker}>MADE FOR LONGER STAYS</div>
          <h2 className={styles.sectionTitle}>
            Everything you need to live, work and settle in comfortably
          </h2>
          <p className={styles.sectionDesc}>
            Our serviced apartments combine the freedom of a home with the convenience and support expected from a professionally managed stay.
          </p>
        </div>

        <div className={styles.amenityGrid}>
          {AMENITIES.map((item, index) => (
            <div key={index} className={styles.amenityCard}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
