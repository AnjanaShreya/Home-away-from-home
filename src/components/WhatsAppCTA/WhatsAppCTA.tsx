import React from 'react';
import siteData from '../../data/booksitedata.json';
import styles from './WhatsAppCTA.module.scss';

export const WhatsAppCTA: React.FC = () => {
  const cleanPhone = siteData.contactInfo.phone.replace(/\D+/g, '');
  return (
    <a
      className={styles.whatsappCta}
      href={`https://wa.me/${cleanPhone}?text=Hi%20Home%20Away%20From%20Home%2C%20I%20would%20like%20to%20check%20availability%20for%20a%20stay%20in%20Hyderabad.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Home Away From Home on WhatsApp"
    >
      <svg viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.81 11.81 0 0 0 12.08 0C5.55 0 .24 5.31.24 11.84c0 2.09.55 4.13 1.59 5.93L.14 24l6.38-1.67a11.8 11.8 0 0 0 5.56 1.42h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.16-1.23-6.14-3.41-8.43ZM12.09 21.75h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.78.99 1.01-3.68-.24-.38a9.83 9.83 0 1 1 8.38 4.65Zm5.39-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.49.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.61.71.23 1.35.2 1.86.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z"></path>
      </svg>
      <span>Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppCTA;
