import styles from "./ToggleBtn.module.css";

function ToggleBtn({ extensionId, isActive, handleToggle }) {
  const uniqueInputId = `toggle-${extensionId}`;

  return (
    <div className={styles.switchContainer}>
      <input
        type="checkbox"
        id={uniqueInputId}
        className={styles.input}
        checked={isActive}
        onChange={() => handleToggle(extensionId)}
      />
      <label htmlFor={uniqueInputId} className={styles.label}>
        Toggle
      </label>
    </div>
  );
}

export default ToggleBtn;
