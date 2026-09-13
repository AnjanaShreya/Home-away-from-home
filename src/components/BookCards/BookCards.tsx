import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
import type { RoomCardData, SelectedTypesState } from '../../types';
import siteData from '../../data/booksitedata.json';
import styles from './BookCards.module.scss';

export const BookCards: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<SelectedTypesState>({
    single: 'nonac',
    double: 'nonac',
    suite: 'nonac',
  });

  const handleTypeToggle = (roomId: string, type: 'ac' | 'nonac') => {
    setSelectedTypes((prev) => ({
      ...prev,
      [roomId]: type,
    }));
  };

  return (
    <section id="tariffs" className={styles.tariffs}>
      <div className="container">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Choose the stay that works for you</h2>
          <p className={styles.sectionDesc}>
            Simple room options for solo travellers, professionals, friends and companions — with AC and Non-AC choices.
          </p>
        </div>

        <div className={styles.tariffGrid}>
          {(siteData.bookCards as RoomCardData[]).map((room) => {
            const currentType = selectedTypes[room.id] || 'ac';
            const price = currentType === 'ac' ? room.acPrice : room.nonAcPrice;

            return (
              <article key={room.id} className={styles.tariffCard}>
                <div className={styles.tariffPhoto}>
                  <img src={room.image} alt={room.title} />
                  {room.badge && (
                    <span
                      className={`${styles.photoBadge} ${room.badgeStyle === 'green' ? styles.greenBadge : styles.whiteBadge
                        }`}
                    >
                      {room.badge}
                    </span>
                  )}
                </div>

                <div className={styles.tariffContent}>
                  <div className={styles.occupancyKicker}>{room.occupancy}</div>
                  <h3 className={styles.cardTitle}>{room.title}</h3>

                  <div className={styles.tariffChips}>
                    <button
                      type="button"
                      className={`${styles.tariffOption} ${currentType === 'ac' ? styles.active : ''
                        }`}
                      onClick={() => handleTypeToggle(room.id, 'ac')}
                    >
                      AC
                    </button>
                    <button
                      type="button"
                      className={`${styles.tariffOption} ${currentType === 'nonac' ? styles.active : ''
                        }`}
                      onClick={() => handleTypeToggle(room.id, 'nonac')}
                    >
                      Non-AC
                    </button>
                  </div>

                  <div className={styles.priceContainer}>
                    <div className={styles.priceVal}>
                      ₹{price.toLocaleString('en-IN')} <span>/night</span>
                    </div>
                    <div className={styles.priceCaption}>
                      {currentType === 'ac' ? 'AC room selected' : 'Non-AC room selected'}
                    </div>
                  </div>

                  <p className={styles.cardDesc}>{room.description}</p>

                  <ul className={styles.featuresList}>
                    {room.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className={styles.checkIcon}>✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.tariffActions}>
                    <Button
                      as={Link}
                      to="/check-availability"
                      appearance="primary"
                      className={styles.bookNowBtn}
                    >
                      Book Your Stay Now →
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Get a Custom Quote Banner (Matching user image) */}
        <article className={styles.customQuoteBanner}>
          <div className={styles.cqLeft}>
            <div className={styles.cqKicker}>PLANNING A LONGER OR GROUP STAY?</div>
            <h3 className={styles.cqTitle}>Get a custom quote</h3>
            <p className={styles.cqDesc}>
              Tell us your dates, number of guests and stay requirement. We’ll work out a suitable stay plan and tariff for you.
            </p>
          </div>
          <div className={styles.cqRight}>
            <ul className={styles.cqFeatureList}>
              <li><span className={styles.cqCheck}>✓</span> Weekly Stays</li>
              <li><span className={styles.cqCheck}>✓</span> Monthly Stays</li>
              <li><span className={styles.cqCheck}>✓</span> Corporate Group Bookings</li>
            </ul>
            <Button
              as={Link}
              to="/check-availability"
              className={styles.cqWhiteBtn}
            >
              Get a Custom Quote →
            </Button>
          </div>
        </article>

        <p className={styles.tariffFootnote}>
          Tariffs shown are subject to room availability and applicable stay conditions.
        </p>
      </div>
    </section>
  );
};

export default BookCards;
