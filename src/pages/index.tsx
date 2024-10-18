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
        <p className={styles.title}>Outsystems Developer & Backend Developer</p>
        <NavBar />
      </header>

      <section id="about" className={styles.about}>
        <h2>About Me</h2>
        <p>
          I'm a passionate developer specializing in Outsystems and backend development using Node.js. 
          I enjoy working on innovative projects and continuously expanding my skills.
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
        <p>Connect with me:</p>
        <a 
          href="https://www.linkedin.com/in/matheus-henrique-souza-a453a5231" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a 
          href="https://github.com/matheussouza17" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
