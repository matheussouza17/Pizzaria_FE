import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Otimização de imagens para Next.js
import styles from './ProjectsGeneralCarousel.module.scss';

// Lista de projetos com link para o GitHub e para o projeto em produção
const projects = [
  { 
    name: 'Inner Friend', 
    logo: '/imagesGeneral/innerfriend.png', 
    link: 'https://inner-friend-fe.vercel.app/', 
    github: 'https://github.com/orgs/TechMind-Innovations/repositories', 
    description: 'An AI assistant that simulates conversations with a virtual friend to provide emotional support.'
  },
  { 
    name: 'Pizzaria Backend', 
    logo: '/imagesGeneral/pizzaria.png', 
    link: '#', 
    github: 'https://github.com/matheussouza17/Pizzaria-BackEnd',
    description: 'A complete system for managing a pizzeria, including orders, inventory, and customer management.'
  },
  { 
    name: 'Invoice Workflow', 
    logo: '/imagesGeneral/workflow.png', 
    link: '#', 
    github: 'https://github.com/matheussouza17?tab=repositories&q=Workflows', 
    description: 'A system for managing invoice approvals, having approval levels and permissions.'
  },
];

const ProjectsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3); 
  const autoScrollDelay = 3000;

  const start = currentIndex * itemsPerPage;
  const end = start + itemsPerPage;

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < Math.ceil(projects.length / itemsPerPage) - 1
        ? prevIndex + 1
        : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0
        ? prevIndex - 1
        : Math.ceil(projects.length / itemsPerPage) - 1
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
        {projects.slice(start, end).map((project, index) => (
          <div
            key={index}
            className={styles.clientCard}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src={project.logo}
              alt={project.name}
              width={120}
              height={120}
              style={{ objectFit: 'contain' }}
            />  

            <div className={styles.clientInfo}>
              <h3>{project.name}</h3>
              <p className={hoveredIndex === index ? styles.showDescription : ''}>
                {project.description}
              </p>
              <div className={styles.buttonsContainer}>
                <button
                  className={styles.projectButton}
                  onClick={() => window.open(project.link, '_blank')} 
                >
                  Ver Projeto
                </button>
                <button
                  className={styles.githubButton}
                  onClick={() => window.open(project.github, '_blank')} 
                >
                  Ver GitHub
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.navButton} onClick={next}>
        &#9654;
      </button>

      <div className={styles.dots}>
        {Array(Math.ceil(projects.length / itemsPerPage))
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

export default ProjectsCarousel;
