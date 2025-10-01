import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { Recipe } from "../types/recipe.types";

// Le chemin vers data.json, en partant de la racine du projet
const DATA_PATH = path.join(__dirname, "../data/data.json");

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    const recipes: Recipe[] = JSON.parse(data);
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error reading data.json:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
