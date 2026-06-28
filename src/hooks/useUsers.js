import { useCallback, useEffect, useState } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      const usersWithDepartments = data.map((user) => ({
        ...user,
      }));

      setUsers(usersWithDepartments);
      setError("");
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = async (user) => {
  try {
    await addUser(user);

    const nextId =
      users.length > 0
        ? Math.max(...users.map((u) => u.id)) + 1
        : 1;

    const newUser = {
      ...user,
      id: nextId,
    };

    setUsers((prev) => [
      ...prev,
      newUser,
    ]);

    return true;
  } catch {
    setError("Unable to add user.");
    return false;
  }
};
  const editUser = async (id, updatedUser) => {
    try {
      await updateUser(id, updatedUser);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                ...updatedUser,
              }
            : user
        )
      );

      return true;
    } catch {
      setError("Unable to update user.");
      return false;
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      return true;
    } catch {
      setError("Unable to delete user.");
      return false;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    editUser,
    removeUser,
  };
};