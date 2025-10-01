import { Request, Response } from "express";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { NewRecipes } from "../types/recipe.types";

const dbPath = path.join(__dirname, "../../database.db");

export const getRecipes = async (req: Request, res: Response) => {
  try {
    //1 - Ouvrir la base de données
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    //2 - Executer la requete select et stocker le resultat
    const data: NewRecipes[] = await db.all(`SELECT * FROM recipes`);

    //3 - Fermer la connexion a la base de données
    await db.close();

    //4 - Envoyer les données
    res.status(200).json(data);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
