import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/ThemeToggle.module.css";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle;