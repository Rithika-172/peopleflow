import { useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaFilter, FaPlus } from "react-icons/fa";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import UserForm from "../components/UserForm";
import DeleteModal from "../components/DeleteModal";
import FilterModal from "../components/FilterModal";
import Loader from "../components/Loader";

import { useUsers } from "../hooks/useUsers";
import { DEFAULT_USERS_PER_PAGE } from "../utils/constants";

import styles from "../styles/Dashboard.module.css";

import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const {
    users,
    loading,
    error,
    createUser,
    editUser,
    removeUser,
  } = useUsers();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
  firstName: "",
  lastName: "",
  email: "",
  department: "",
});
  const [sortField, setSortField] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(
  DEFAULT_USERS_PER_PAGE
);

  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

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

  const filteredUsers = useMemo(() => {
  const filtered = users.filter((user) => {
    const names = user.name.split(" ");

    const firstName = names[0] || "";
    const lastName =
      names.slice(1).join(" ");

    const userDepartment =
      user.department ||
      getDepartment(user.id);

    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFirstName =
      !filters.firstName ||
      firstName
        .toLowerCase()
        .includes(
          filters.firstName.toLowerCase()
        );

    const matchesLastName =
      !filters.lastName ||
      lastName
        .toLowerCase()
        .includes(
          filters.lastName.toLowerCase()
        );

    const matchesEmail =
      !filters.email ||
      user.email
        .toLowerCase()
        .includes(
          filters.email.toLowerCase()
        );

    const matchesDepartment =
      !filters.department ||
      userDepartment ===
        filters.department;

    return (
      matchesSearch &&
      matchesFirstName &&
      matchesLastName &&
      matchesEmail &&
      matchesDepartment
    );
  });

  if (sortField) {
    filtered.sort((a, b) => {
      let valueA = "";
      let valueB = "";

      if (sortField === "firstName") {
        valueA = a.name.split(" ")[0];
        valueB = b.name.split(" ")[0];
      }

      if (sortField === "lastName") {
        valueA = a.name
          .split(" ")
          .slice(1)
          .join(" ");

        valueB = b.name
          .split(" ")
          .slice(1)
          .join(" ");
      }

      if (sortField === "email") {
        valueA = a.email;
        valueB = b.email;
      }

      if (sortField === "department") {
        valueA =
          a.department ||
          getDepartment(a.id);

        valueB =
          b.department ||
          getDepartment(b.id);
      }

      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }

  return filtered;
}, [
  users,
  search,
  filters,
  sortField,
  sortOrder,
]);
  const totalPages = Math.ceil(
  filteredUsers.length / usersPerPage
);

  const startIndex =
  (currentPage - 1) * usersPerPage;

  const currentUsers = filteredUsers.slice(
  startIndex,
  startIndex + usersPerPage
);

  const handleAdd = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleSave = async (data) => {
  if (selectedUser) {
    await editUser(selectedUser.id, {
      ...data,
      department: data.department,
      company: {
        name: data.company,
      },
    });

    toast.success("User updated.");
  } else {
    const success = await createUser({
      ...data,
      department: data.department,
      company: {
        name: data.company,
      },
    });

    if (success) {
      const nextPage = Math.ceil(
        (users.length + 1) / usersPerPage
      );

      setCurrentPage(nextPage);

      toast.success("User added.");
    }
  }

  setShowForm(false);
};
  const handleDelete = async () => {
    await removeUser(selectedUser.id);

    toast.success("User deleted.");

    setShowDelete(false);
  };

  return (
    <div className={styles.dashboard}>
      <Navbar />

      <div className={styles.actions}>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <div className={styles.buttons}>
            <select
  className={styles.sort}
  value={sortField}
  onChange={(e) =>
    setSortField(e.target.value)
  }
>
  <option value="">Sort By</option>
  <option value="firstName">
    First Name
  </option>
  <option value="lastName">
    Last Name
  </option>
  <option value="email">
    Email
  </option>
  <option value="department">
    Department
  </option>
</select>

<select
  className={styles.sort}
  value={sortOrder}
  onChange={(e) =>
    setSortOrder(e.target.value)
  }
>
  <option value="asc">
    Ascending
  </option>
  <option value="desc">
    Descending
  </option>
</select>
          <button
            className={styles.filterBtn}
            onClick={() => setShowFilter(true)}
          >
            <FaFilter />
            Filters
          </button>

          <button
            className={styles.addBtn}
            onClick={handleAdd}
          >
            <FaPlus />
            Add User
          </button>
        </div>
      </div>

      {loading && <Loader />}

      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}

      {!loading && (
        <>
        console.log(users);
          <UserTable
            users={currentUsers}
            onEdit={handleEdit}
            onDelete={(user) => {
              setSelectedUser(user);
              setShowDelete(true);
            }}
          />

         <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  setCurrentPage={setCurrentPage}
  totalUsers={filteredUsers.length}
  usersPerPage={usersPerPage}
  setUsersPerPage={setUsersPerPage}
/>
        </>
      )}

      {showForm && (
        <UserForm
          selectedUser={selectedUser}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {showDelete && (
        <DeleteModal
          user={selectedUser}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      )}

      {showFilter && (
        <FilterModal
  filters={filters}
  setFilters={setFilters}
  onClose={() => setShowFilter(false)}
/>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
}

export default Dashboard;