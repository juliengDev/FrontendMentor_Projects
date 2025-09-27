import styles from "./Filter.module.css";

function Filter({ activTab, setActivTab }) {
  const tabs = ["All", "Active", "Inactive"];

  return (
    <div className={styles.filter__tabs}>
      <ul className={styles.filter__container}>
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              className={` ${styles.filter__link} ${
                tab === activTab ? styles.active : ""
              }`}
              onClick={() => setActivTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;
