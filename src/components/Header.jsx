import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Dogs from "../Assets/dogs.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <nav className={`${styles.nav} container`}>
          <Link className={styles.logo} to="/" aria-label="dogs - home">
            <img src={Dogs} alt="Dogs logo" />
          </Link>
        <div className={styles.rightSection}>
          <Link className={styles.login} to="/login">Login / Criar</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
