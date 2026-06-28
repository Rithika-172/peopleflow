import ThemeToggle from "./ThemeToggle";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <h1 className={styles.logo}>PeopleFlow</h1>
        <p className={styles.tagline}>
          Smart User Management Dashboard
        </p>
      </div>

      <ThemeToggle />
    </nav>
  );
}

export default Navbar;