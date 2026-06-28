import styles from "../styles/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div className={styles.searchContainer}>
      <FaSearch className={styles.icon} />

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}

export default SearchBar;