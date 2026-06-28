import styles from "../styles/DeleteModal.module.css";

function DeleteModal({ user, onClose, onConfirm }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete
          <strong> {user?.name}</strong>?
        </p>

        <div className={styles.buttons}>
          <button onClick={onClose}>
            Cancel
          </button>

          <button onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;