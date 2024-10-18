import React, { useState, useEffect } from 'react';
import styles from './ClientsCarousel.module.scss';
import Image from 'next/image';

// Lista de clientes e breve descrição do trabalho realizado
const clients = [
  { 
    name: 'Benfica', 
    logo: '/imagesClientOt/benfica-logo.png', 
    description: 'Maintenance of member systems in Outsystems.',
    link: 'https://www.slbenfica.pt/' // URL de exemplo
  },
  { 
    name: 'Banco CTT', 
    logo: '/imagesClientOt/banco-ctt-logo.png', 
    description: 'Maintenance and development of credit approval and simulation workflow systems in Outsystems.',
    link: 'https://www.bancoctt.pt/' // URL de exemplo
  },
  { 
    name: 'Fundação José Neves', 
    logo: '/imagesClientOt/fjn-logo.png', 
    description: 'ISA maintenance and development, financial support for students in Outsystems.',
    link: 'https://www.joseneves.org/' // URL de exemplo
  },
  { 
    name: 'Mercer', 
    logo: '/imagesClientOt/mercer-logo.png', 
    description: 'Developed HR solutions with Outsystems.',
    link: 'https://www.mercer.com/' // URL de exemplo
  },
  { 
    name: 'CTT', 
    logo: '/imagesClientOt/ctt-logo.png', 
    description: 'Created logistical platforms in Outsystems.',
    link: 'https://www.ctt.pt/' // URL de exemplo
  },
  { 
    name: 'Auchan', 
    logo: '/imagesClientOt/auchan-logo.png', 
    description: 'Streamlined retail operations with Outsystems.',
    link: 'https://www.auchan.pt/' // URL de exemplo
  },
];

const ClientsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoScrollDelay = 3000;

  const start = currentIndex * itemsPerPage;
  const end = start + itemsPerPage;

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < Math.ceil(clients.length / itemsPerPage) - 1
        ? prevIndex + 1
        : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0
        ? prevIndex - 1
        : Math.ceil(clients.length / itemsPerPage) - 1
    );
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      next();
    }, autoScrollDelay);

    return () => clearInterval(autoScroll);
  }, [autoScrollDelay, currentIndex, itemsPerPage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setItemsPerPage(mobile ? 1 : 3);
        setIsMobile(mobile);
      };

      handleResize();

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Detectar início do toque
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Detectar fim do toque e decidir se vai para a direita ou esquerda
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const swipeDistance = touchStart - touchEnd;
      const minSwipeDistance = 50; // Distância mínima para considerar um swipe

      if (swipeDistance > minSwipeDistance) {
        next(); // Swipe para a esquerda (ir para o próximo)
      }

      if (swipeDistance < -minSwipeDistance) {
        prev(); // Swipe para a direita (voltar para o anterior)
      }
    }

    // Resetar os valores de toque após o swipe
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className={styles.carouselContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!isMobile && (
        <button className={styles.navButton} onClick={prev}>
          &#9664;
        </button>
      )}

      <div className={styles.carousel}>
        {clients.slice(start, end).map((client, index) => (
          <div
            key={index}
            className={styles.clientCard}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={120}
              height={120}
              style={{ objectFit: 'contain' }}
            />

            <div className={styles.clientInfo}>
              <h3>{client.name}</h3>
              <p className={isMobile || hoveredIndex === index ? styles.showDescription : ''}>
                {client.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!isMobile && (
        <button className={styles.navButton} onClick={next}>
          &#9654;
        </button>
      )}

      <div className={styles.dots}>
        {Array(Math.ceil(clients.length / itemsPerPage))
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

export default ClientsCarousel;
