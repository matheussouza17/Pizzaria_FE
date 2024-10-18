import React from 'react';
import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navBar}>
      <ul>
        <li>
          <button onClick={() => scrollToSection('about')}>About</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('projects')}>Projects</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('certifications')}>Certifications</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('footer')}>Contact</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
