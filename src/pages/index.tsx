import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import React from 'react';
import NavBar from './components/NavBar';
import CertificationsCarousel from './components/CertificationsCarousel';
import ClientsCarousel from './components/ClientsCarousel';
import ProjectsNodeCarousel from './components/ProjectsGeneralCarousel';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <Image
          src="/general/Me.jpg"
          alt="Matheus Henrique Souza"
          className={styles.profileImage}
          width={150} 
          height={150} 
          priority 
        />
        <h1 className={styles.name}>Matheus Henrique Souza</h1>
        
        <div className={styles.redes}>
          <a href="https://www.linkedin.com/in/matheus-henrique-souza-a453a5231" target="_blank" rel="noopener noreferrer">
            <Image
              src="/general/Linkedin.png"
              alt="Linkedin"
              className={styles.socialIcon}
              width={50}
              height={50}
              priority 
            />
          </a>
          <a href="https://github.com/matheussouza17" target="_blank" rel="noopener noreferrer">
            <Image
              src="/general/GitHub.png"
              alt="GitHub"
              className={styles.socialIcon}
              width={50}
              height={50}
              priority 
            />
          </a>
          <a href="https://www.instagram.com/matheus_21_07/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/general/Instagram.png"
              alt="Instagram"
              className={styles.socialIcon}
              width={50}
              height={50}
              priority 
            />
          </a>
        </div>
        
        <p className={styles.title}>Outsystems Developer & Backend Developer</p>
        <NavBar />
      </header>

      <section id="about" className={styles.about}>
        <h2>About Me</h2>
        <p>
          Hello,<br /><br />
          I am passionate about development and love creating new applications, innovating, and feeling like I'm building something meaningful. 
          For me, it's not just about contributing to a company; it's about enabling people to make their workdays less stressful through the tools I create. 
          I thrive on novelty and embrace new challenges. In recent years, life has taught me the value of adaptability, and development offers that flexibility, 
          which is why I am so passionate about it.<br /><br />
          Currently, I work as an OutSystems Developer, a platform I deeply appreciate. In addition to that, I freelance as a back-end developer using NodeJS. 
          I am also studying Computer Science at PUC Goiás, which helps me with theoretical concepts that do not apply in practice, and this allows me to better 
          understand why certain methods are used in practice. Although I have a good foundation in college, I need to improve outside of university to combine 
          theory and practice in a harmonious learning experience.<br /><br />
          In my free time, I like to spend time with my family and play sports like soccer.<br /><br />
          And that's me.
        </p>
      </section>

      <section id="projects" className={styles.clients}>
        <h2>Clients & Projects with Outsystems</h2>
        <ClientsCarousel />
      </section>

      <section id="projectsNode" className={styles.projects}>
        <h2>Other Projects</h2>
        <ProjectsNodeCarousel />
      </section>

      <section id="certifications" className={styles.certifications}>
        <h2>Certifications</h2>
        <CertificationsCarousel />
      </section>     

      <footer id="footer" className={styles.footer}>
        <p>All rights reserved to Matheus Henrique Souza</p>
      </footer>
    </div>
  );
}
