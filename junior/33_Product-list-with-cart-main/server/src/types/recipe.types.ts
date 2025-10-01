export interface Recipe {
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

export interface NewRecipes extends Recipe {
  id: string;
}
