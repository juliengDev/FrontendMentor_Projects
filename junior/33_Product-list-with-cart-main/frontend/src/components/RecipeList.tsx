import React from "react";
import styles from "./RecipeList.module.css";
import ProductsList from "./ProductsList";

interface Recipe {
  name: string;
  price: number;
  category: string;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
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
