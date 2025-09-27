import { useState } from "react";

import styles from "./Dashboard.module.css";
import Filter from "../Filter/Filter";
import Extension from "../Extension/Extension";

function Dashboard({ data }) {
  const [activTab, setActivTab] = useState("All");
  console.log("Données récupérées côté serveur :", data);
  return (
    <>
      <section className={styles.filter}>
        <h1 className={styles.filter__heading}>Extensions List</h1>
        <Filter activTab={activTab} setActivTab={setActivTab} />
      </section>
      <section className={styles.extension}>
        <Extension data={data} />
      </section>
    </>
  );
}

export default Dashboard;
