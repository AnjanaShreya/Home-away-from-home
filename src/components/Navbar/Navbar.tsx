import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'rsuite';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navInner}`}>
        <a href="#hero" className={styles.brand}>
          <span className={styles.brandMark}>
            <svg fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M3 11.3 12 4l9 7.3"></path>
              <path d="M5.5 10.5V20h13v-9.5"></path>
              <path d="M9 20v-5.5h6V20"></path>
            </svg>
          </span>
          Home Away From Home
        </a>

        <nav className={styles.navLinks}>
          <a href="#stays">Stays</a>
          <a href="#tariffs">Tariffs</a>
          <a href="#amenities">Amenities</a>
          <a href="#why-us">Why Us</a>
          <Button
            as="a"
            href="#contact"
            className={styles.navCta}
            appearance="ghost"
          >
            Enquire Now →
          </Button>
        </nav>

        <Button
          className={styles.mobileMenuBtn}
          appearance="subtle"
          onClick={() => setOpenDrawer(true)}
          aria-label="Toggle mobile menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>

        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          placement="right"
          size="xs"
          className={styles.mobileDrawer}
        >
          <Drawer.Header>
            <Drawer.Title className={styles.drawerTitle}>Home Away From Home</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <div className={styles.mobileNavLinks}>
              <a href="#stays" onClick={() => setOpenDrawer(false)}>Stays</a>
              <a href="#tariffs" onClick={() => setOpenDrawer(false)}>Tariffs</a>
              <a href="#amenities" onClick={() => setOpenDrawer(false)}>Amenities</a>
              <a href="#why-us" onClick={() => setOpenDrawer(false)}>Why Us</a>
              <Button
                as="a"
                href="#contact"
                appearance="primary"
                color="blue"
                block
                className={styles.drawerBtn}
                onClick={() => setOpenDrawer(false)}
              >
                Enquire Now →
              </Button>
            </div>
          </Drawer.Body>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
