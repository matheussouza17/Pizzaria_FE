import React, { useState, useEffect } from 'react';
import styles from './ClientsCarousel.module.scss';
import Image from 'next/image';

// Lista de clientes e breve descrição do trabalho realizado
const clients = [
  { 
    name: 'Benfica', 
    logo: '/imagesClientOt/benfica-logo.png', 
    description: 'Developed custom Outsystems solutions for their operations.',
    link: 'https://www.slbenfica.pt/' // URL de exemplo
  },
  { 
    name: 'Banco CTT', 
    logo: '/imagesClientOt/banco-ctt-logo.png', 
    description: 'Implemented banking workflows in Outsystems.',
    link: 'https://www.bancoctt.pt/' // URL de exemplo
  },
  { 
    name: 'Fundação José Neves', 
    logo: '/imagesClientOt/fjn-logo.png', 
    description: 'Built educational platforms using Outsystems.',
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
  const [itemsPerPage, setItemsPerPage] = useState(3); // Número de itens por página
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
  }, [autoScrollDelay]);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Verifica se está no lado do cliente
      const handleResize = () => {
        setItemsPerPage(window.innerWidth < 768 ? 1 : 3); // Ajusta o número de itens por página com base no tamanho da janela
      };

      handleResize(); // Executa a função uma vez para definir o valor inicial

      window.addEventListener('resize', handleResize); // Adiciona o listener de resize
      return () => window.removeEventListener('resize', handleResize); // Remove o listener no cleanup
    }
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={prev}>
        &#9664;
      </button>

      <div className={styles.carousel}>
        {clients.slice(start, end).map((client, index) => (
          <div
            key={index}
            className={styles.clientCard}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => window.open(client.link, '_blank')} // Redireciona ao clicar no card
            style={{ cursor: 'pointer' }} // Muda o cursor ao passar o mouse, indicando que é clicável
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={120}
              height={120}
              style={{ objectFit: 'contain' }} // Ajusta a imagem ao container
            />
            <div className={styles.clientInfo}>
              <h3>{client.name}</h3>
              <p className={hoveredIndex === index ? styles.showDescription : ''}>
                {client.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.navButton} onClick={next}>
        &#9654;
      </button>

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
