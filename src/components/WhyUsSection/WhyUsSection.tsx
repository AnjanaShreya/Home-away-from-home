import React from 'react';
import styles from './WhyUsSection.module.scss';

const FEATURES = [
  'Flexible for short & extended durations',
  'More privacy than conventional hotels',
  'Suitable for individuals & families',
  'Professionally managed stay experience',
];

export const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" className={styles.whyUsSection}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Content */}
          <div className={styles.leftCol}>
            <div className={styles.kicker}>MORE THAN A ROOM</div>
            <h2 className={styles.title}>
              A dependable Hyderabad base for the time you need it
            </h2>
            <p className={styles.description}>
              Whether you are in the city for a project, relocating, supporting a family member through treatment, or simply need a place for a longer stay, Home Away From Home is designed to make the transition easier.
            </p>

            <div className={styles.featureGrid}>
              {FEATURES.map((feat, idx) => (
                <div key={idx} className={styles.featureBox}>
                  {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Card */}
          <div className={styles.rightCol}>
            <div className={styles.imageCard}>
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                alt="Home Away From Home Serviced Apartment Building"
              />
              <div className={styles.floatingBadge}>
                A space that feels familiar, even when Hyderabad is not home.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
