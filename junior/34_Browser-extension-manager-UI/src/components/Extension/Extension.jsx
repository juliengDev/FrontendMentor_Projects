import styles from "./Extension.module.css";
import ToggleBtn from "./ToggleBtn";

function Extension({
  id,
  logo,
  name,
  description,
  isActive,
  handleToggle,
  handleRemove,
}) {
  return (
    <li className={styles.extension__item}>
      <div className={styles.extension__heading}>
        <img
          className={styles.extension__logo}
          src={logo}
          alt="extension logo"
        />
        <div>
          <h3 className={styles.extension__name}>{name}</h3>
          <p className={styles.extension__description}>{description}</p>
        </div>
      </div>
      <div className={styles.extension__action}>
        <button
          onClick={() => handleRemove(id)}
          className={styles.extension__removeBtn}
        >
          Remove
        </button>
        <ToggleBtn
          extensionId={id}
          isActive={isActive}
          handleToggle={handleToggle}
        />
      </div>
    </li>
  );
}

export default Extension;
