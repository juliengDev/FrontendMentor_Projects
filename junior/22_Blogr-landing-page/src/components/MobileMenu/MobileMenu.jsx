import { useState } from "react";
import styles from "./MobileMenu.module.css";

const productLinks = [
  { href: "#", label: "Overview" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Features" },
  { href: "#", label: "Integrations" },
];

const companyLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Team" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Careers" },
];

const connectLinks = [
  { href: "#", label: "Contact" },
  { href: "#", label: "Newsletter" },
  { href: "#", label: "LinkedIn" },
];

function NavItem({ title, links, isOpen, setIsOpen }) {
  return (
    <div className={styles.navItem}>
      <button
        className={`${styles.navItemTitle} ${isOpen ? styles.active : ""}`}
        onClick={setIsOpen}
      >
        {title}
        <img
          className={`${styles.arrow} ${isOpen ? styles.active : ""}`}
          src="/images/icon-arrow-dark.svg"
          alt="icon arrow"
        />
      </button>
      <div className={`${styles.navItemMenu} ${isOpen ? styles.open : ""}`}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`${styles.navItemLink} txt-preset-6-regular`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null);

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button
        className={`${styles.menuButton} ${isOpen ? styles.hidden : ""}`}
        onClick={handleToggleMenu}
        aria-label="Open menu"
      >
        <img src="/images/icon-hamburger.svg" alt="icon open mobile menu" />
      </button>
      <button
        className={`${styles.menuButton} ${!isOpen ? styles.hidden : ""}`}
        onClick={handleToggleMenu}
        aria-label="Close menu"
      >
        <img src="/images/icon-close.svg" alt="icon close mobile menu" />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <nav className={styles.navigation}>
            <NavItem
              title="Product"
              links={productLinks}
              isOpen={openItem === "Product"}
              setIsOpen={() => setOpenItem(openItem === "Product" ? null : "Product")}
            />
            <NavItem
              title="Company"
              links={companyLinks}
              isOpen={openItem === "Company"}
              setIsOpen={() => setOpenItem(openItem === "Company" ? null : "Company")}
            />
            <NavItem
              title="Connect"
              links={connectLinks}
              isOpen={openItem === "Connect"}
              setIsOpen={() => setOpenItem(openItem === "Connect" ? null : "Connect")}
            />
          </nav>
          <div className={styles.divider} />
          <div className={styles.authButtons}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.signupButton}>Sign Up</button>
          </div>
        </div>
      )}
    </>
  );
}