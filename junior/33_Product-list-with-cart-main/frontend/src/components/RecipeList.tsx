import React from "react";
import styles from "./RecipeList.module.css";
import ProductsList from "./ProductsList";

interface Recipe {
  id: number;
  name: string;
  price: number;
  category: string;
  image_thumbnail: string;
  image_mobile: string;
  image_tablet: string;
  image_desktop: string;
}

export interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <main className={styles.app}>
      <h1 className={styles.app__heading}>Desserts</h1>
      <ProductsList recipes={recipes} />
    </main>
  );
};

export default RecipeList;
