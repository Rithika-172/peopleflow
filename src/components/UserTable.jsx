import styles from "../styles/UserTable.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function UserTable({ users, onEdit, onDelete }) {
  const getDepartment = (id) => {
    const departments = [
      "IT",
      "HR",
      "Sales",
      "Marketing",
      "Finance",
    ];

    return departments[id % departments.length];
  };

  const getBadgeClass = (dept) => {
    switch (dept) {
      case "IT":
        return styles.it;
      case "HR":
        return styles.hr;
      case "Sales":
        return styles.sales;
      case "Marketing":
        return styles.marketing;
      case "Finance":
        return styles.finance;
      default:
        return "";
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const names = user.name.split(" ");

            const firstName = names[0] || "";

            const lastName =
              names.slice(1).join(" ") || "";

            const department =
              user.department ||
              getDepartment(user.id);

            return (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>
                  <div className={styles.avatar}>
                    {firstName.charAt(0)}
                    {lastName.charAt(0)}
                  </div>
                </td>

                <td>{firstName}</td>

                <td>{lastName}</td>

                <td>{user.email}</td>

                <td>{user.phone}</td>

                <td>{user.company?.name}</td>

                <td>
                  <span
                    className={`${styles.badge} ${getBadgeClass(
                      department
                    )}`}
                  >
                    {department}
                  </span>
                </td>

                <td className={styles.actions}>
                  <button onClick={() => onEdit(user)}>
                    <FaEdit />
                  </button>

                  <button onClick={() => onDelete(user)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;