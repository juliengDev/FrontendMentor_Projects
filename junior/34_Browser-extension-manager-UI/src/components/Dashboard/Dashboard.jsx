import { useState } from "react";
import styles from "./Dashboard.module.css";
import Filter from "../Filter/Filter";
import Extension from "../Extension/Extension";

function Dashboard({ data }) {
  const [activeTab, setActiveTab] = useState("All");
  const [extensions, setExtensions] = useState(data);

  function handleRemove(id) {
    const newExtensions = extensions.filter((ext) => ext.id !== id);
    setExtensions(newExtensions);
  }

  function handleToggle(id) {
    const newExtensions = extensions.map((ext) => {
      if (ext.id === id) {
        return { ...ext, isActive: !ext.isActive };
      }
      return ext;
    });
    setExtensions(newExtensions);
  }

  let filteredExtensions;
  if (activeTab === "Active") {
    filteredExtensions = extensions.filter((ext) => ext.isActive === true);
  } else if (activeTab === "Inactive") {
    filteredExtensions = extensions.filter((ext) => ext.isActive === false);
  } else {
    filteredExtensions = extensions;
  }

  return (
    <>
      <section className={styles.filter}>
        <h1 className={styles.filter__heading}>Extensions List</h1>
        <Filter activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>

      <section>
        {filteredExtensions && filteredExtensions.length > 0 ? (
          <ul className={styles.extensionsGrid}>
            {filteredExtensions.map((ext) => (
              <Extension
                key={ext.id}
                id={ext.id}
                logo={ext.logo}
                name={ext.name}
                description={ext.description}
                isActive={ext.isActive}
                handleToggle={handleToggle}
                handleRemove={handleRemove}
              />
            ))}
          </ul>
        ) : (
          <p className={styles.filter__notFound}>No extensions found.</p>
        )}
      </section>
    </>
  );
}

export default Dashboard;
