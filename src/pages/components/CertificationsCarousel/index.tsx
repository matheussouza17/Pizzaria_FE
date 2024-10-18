import React, { useState, useEffect } from 'react';
import styles from './CertificationsCarousel.module.scss';
import Image from 'next/image';

const certifications = [
  { 
    name: 'Outsystems Certified Associate Developer', 
    year: 2022, 
    logo: '/imagesCetification/outsystems-cert.png', 
    description: 'Certified for developing applications with Outsystems technology.',
    link: 'https://www.outsystems.com/profile/auvjvktewk'
  },
  { 
    name: 'Node.js Backend Developer Certification', 
    year: 2020, 
    logo: '/imagesCetification/nodejs-cert.png', 
    description: 'Certified in building robust backend systems with Node.js.',
    link: '#'
  },
  { 
    name: 'Outsystems Certified Associate Developer ODC', 
    year: 2024, 
    logo: '/imagesCetification/outsystemsodc-cert.png', 
    description: 'Certified for developing applications with Outsystems ODC technology.',
    link: 'https://www.outsystems.com/profile/auvjvktewk'
  },
  { 
    name: 'REST APIs com Python e Flask', 
    year: 2023, 
    logo: '/imagesCetification/python.png', 
    description: 'Certified in building robust backend systems with python with flask.',
    link: 'https://www.udemy.com/certificate/UC-17f2cf32-0be8-4825-b18a-da76768adeed/'
  },
  { 
    name: 'Figma', 
    year: 2023, 
    logo: '/imagesCetification/figma.webp', 
    description: 'Certified in building fast, functional prototypes with Figma.',
    link: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-702a6e22-74f2-4c2a-826b-18ffdb47e24a.pdf'
  },
  { 
    name: 'Mendix Intermediate Developer', 
    year: 2023, 
    logo: '/imagesCetification/Mendix.png', 
    description: 'Certified in building fast, functional prototypes with Mendix.',
    link: 'https://developerprofiles.mendix.com/link/profile/overview/704244'
  },
  { 
    name: 'SCRUM', 
    year: 2023, 
    logo: '/imagesCetification/scrum.png', 
    description: 'Certified in Agile SCRUM - The Practical and Definitive Guide.',
    link: 'https://www.udemy.com/certificate/UC-db01dc48-b8d4-4447-917a-b690e1f75f2e/'
  },
  { 
    name: 'Business English', 
    year: 2023, 
    logo: '/imagesCetification/BusinessEnglish.png', 
    description: 'Certified in Business for English.',
    link: 'https://www.udemy.com/certificate/UC-f28ef91d-700f-41d9-ba09-1bf8232f6671/'
  },
];

const CertificationCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const autoScrollDelay = 3000;

  const start = currentIndex * itemsPerPage;
  const end = start + itemsPerPage;

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < Math.ceil(certifications.length / itemsPerPage) - 1
        ? prevIndex + 1
        : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0
        ? prevIndex - 1
        : Math.ceil(certifications.length / itemsPerPage) - 1
    );
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      next();
    }, autoScrollDelay);

    return () => clearInterval(autoScroll);
  }, [autoScrollDelay]);

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      const handleResize = () => {
        setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
      };

      handleResize(); 

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={prev}>
        &#9664;
      </button>

      <div className={styles.carousel}>
        {certifications.slice(start, end).map((certification, index) => (
          <div
            key={index}
            className={styles.clientCard}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => window.open(certification.link, '_blank')}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src={certification.logo}
              alt={certification.name}
              width={100}
              height={100}
              style={{ objectFit: 'contain' }}
            />
            <div className={styles.clientInfo}>
              <h3>{certification.name}</h3>
              <p className={hoveredIndex === index ? styles.showDescription : ''}>
                {certification.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.navButton} onClick={next}>
        &#9654;
      </button>

      <div className={styles.dots}>
        {Array(Math.ceil(certifications.length / itemsPerPage))
          .fill(0)
          .map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
      </div>
    </div>
  );
};

export default CertificationCarousel;