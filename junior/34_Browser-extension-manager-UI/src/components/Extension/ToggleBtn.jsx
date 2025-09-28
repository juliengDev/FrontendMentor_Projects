import styles from "./ToggleBtn.module.css";

function ToggleBtn({ extensionId, initialIsActive, handleToggle }) {
  const uniqueInputId = `toggle-${extensionId}`;

  return (
    <div className={styles.switchContainer}>
      <input
        type="checkbox"
        id={uniqueInputId}
        className={styles.input}
        defaultChecked={initialIsActive}
        onChange={() => handleToggle(extensionId)}
      />
      <label htmlFor={uniqueInputId} className={styles.label}>
        Toggle
      </label>
    </div>
  );
}

export default ToggleBtn;
