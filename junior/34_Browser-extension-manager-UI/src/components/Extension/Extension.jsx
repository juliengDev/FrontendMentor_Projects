import styles from "./Extension.module.css";

function Extension({ data }) {
  return (
    <>
      {data.length > 0 && (
        <ul className={styles.extension__container}>
          {data.map((ext) => (
            <li key={ext.id} className={styles.extension__item}>
              <div className={styles.extension__heading}>
                <img
                  className={styles.extension__logo}
                  src={ext.logo}
                  alt="extension logo"
                />
                <div>
                  <h3 className={styles.extension__name}>{ext.name}</h3>
                  <p className={styles.extension__description}>
                    {ext.description}
                  </p>
                </div>
              </div>
              <div className={styles.extension__action}>
                <button className={styles.extenstion__removeBtn}>Remove</button>
                <button>Toggle</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Extension;
