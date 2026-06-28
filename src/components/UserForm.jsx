import { useEffect, useState } from "react";
import styles from "../styles/UserForm.module.css";

function UserForm({ onClose, onSave, selectedUser }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    department: "IT",
  });

  useEffect(() => {
    if (selectedUser) {
      const names = selectedUser.name.split(" ");

      setFormData({
        firstName: names[0] || "",
        lastName: names.slice(1).join(" ") || "",
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
        company: selectedUser.company?.name || "",
        department:
          selectedUser.department || "IT",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.company
    ) {
      alert("Please fill all fields.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    onSave({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      department: formData.department,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>
          {selectedUser
            ? "Edit User"
            : "Add User"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
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
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;