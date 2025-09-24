import { useState } from "react";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu() {
    setIsOpen(!isOpen);
    console.log("menu toggled");
  }

  return (
    <>
      <button
        id="open-btn"
        className={`${styles.openButton} reset-btn`}
        onClick={handleToggleMenu}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <img src="/images/icon-hamburger.svg" alt="icon open mobile menu" />
      </button>

      {isOpen && (
        <div className="menu">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      )}
    </>
  );
}
