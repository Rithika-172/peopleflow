import { useState } from "react";
import styles from "../styles/FilterModal.module.css";

function FilterModal({
  filters,
  setFilters,
  onClose,
}) {
  const [localFilters, setLocalFilters] =
    useState(filters);

  const handleChange = (e) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const clearFilters = () => {
    const emptyFilters = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    };

    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Filter Users</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={localFilters.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={localFilters.lastName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={localFilters.email}
          onChange={handleChange}
        />

        <select
          name="department"
          value={localFilters.department}
          onChange={handleChange}
        >
          <option value="">
            All Departments
          </option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">
            Marketing
          </option>
          <option value="Finance">
            Finance
          </option>
        </select>

        <div className={styles.buttons}>
          <button
            className={styles.clear}
            onClick={clearFilters}
          >
            Clear
          </button>

          <button
            className={styles.apply}
            onClick={applyFilters}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;