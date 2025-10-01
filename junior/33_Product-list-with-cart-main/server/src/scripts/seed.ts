import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { promises as fs } from "fs";
import path from "path";
import { Recipe } from "../types/recipe.types";
// Fonction principale auto-exécutante
(async () => {
  // Définir les chemins
  const dbPath = path.join(__dirname, "../../database.db");
  const dataPath = path.join(__dirname, "../data/data.json");

  try {
    // 1. Ouvrir la connexion à la base de données
    console.log("Connexion à la base de données réussie.");
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // 2. Créer la table 'recipes' (si elle n'existe pas)
    // TODO: Écrire la requête CREATE TABLE ici
    console.log("Création de la table recipes...");
    await db.exec(`CREATE TABLE recipes (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         category TEXT NOT NULL,
         price REAL NOT NULL,
        image_thumbnail TEXT,
         image_mobile TEXT,
         image_tablet TEXT,
         image_desktop TEXT
    )`);

    // 3. Lire le fichier data.json
    // TODO: Lire et parser le fichier
    const data = await fs.readFile(dataPath, "utf-8");
    const recipes = JSON.parse(data);
    // 4. Insérer les données dans la table
    // TODO: Boucler sur les données et exécuter les requêtes INSERT
    recipes.forEach(async (recipe: Recipe) => {
      await db.run(
        `INSERT INTO recipes (name,category,price,image_thumbnail,image_mobile,image_tablet,image_desktop) VALUES (?,?,?,?,?,?,?)`,
        recipe.name,
        recipe.category,
        recipe.price,
        recipe.image.thumbnail,
        recipe.image.mobile,
        recipe.image.tablet,
        recipe.image.desktop
      );
    });
    // 5. Fermer la connexion
    await db.close();
    console.log("Base de données initialisée avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données:", error);
  }
})();
