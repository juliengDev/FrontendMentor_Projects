import styles from "./FilterTabs.module.css";

function FilterTabs() {
  const tabs = ["All", "Active", "Inactive"];
  const activeTab = "All"; 
  return (
    <div class={styles.filter__tabs}>
      <ul class={styles.filter__container}>
        {tabs.map((tab) => (
          <li
            class={`${styles.filter__link} ${tab === activeTab ? styles.active : ""}`}
            key={tab}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterTabs;
