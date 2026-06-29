import styles from "../styles/Pagination.module.css";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  totalUsers,
  currentUsers,
  usersPerPage,
  setUsersPerPage,
}) {
  const pages = [...Array(totalPages)].map(
    (_, index) => index + 1
  );

  return (
    <div className={styles.pagination}>
      <div className={styles.left}>
  Showing {currentUsers} of {totalUsers} users
</div>

      <div className={styles.right}>
        <div className={styles.rows}>
          Rows:
          <select
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className={styles.controls}>
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            <FaChevronLeft />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              className={
                currentPage === page
                  ? styles.active
                  : ""
              }
              onClick={() =>
                setCurrentPage(page)
              }
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;