import type { RecipeListProps } from "./RecipeList";
import styles from "./ProductsList.module.css";
const ProductsList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <ul className={styles.productList}>
      {recipes.map((recipe, index) => {
        const {
          id,
          name,
          category,
          price,
          image_mobile,
          image_tablet,
          image_desktop,
        } = recipe;
        const cartIcon = "/assets/images/svg/icon-add-to-cart.svg";
        return (
          <li className={styles.product__container} key={index}>
            <div className={styles.product__ImgContainer}>
              <picture>
                <source
                  srcSet={image_desktop.substring(2)}
                  media="(min-width: 1200px)"
                />
                <source
                  srcSet={image_tablet.substring(2)}
                  media="(min-width: 768px)"
                />
                <img
                  className={styles.product__img}
                  src={image_mobile.substring(2)}
                  alt={`Image of ${name}`}
                />
              </picture>
              <div className={styles.product__addToCartContainer}>
                <button className={styles.product__addToCartBtn}>
                  <img src={cartIcon} alt="Icon add to cart" />
                  Add to Cart
                </button>
              </div>
            </div>
            <div className={styles.product__Description}>
              <p className={styles.product__DescriptionCategory}>{category}</p>
              <p className={styles.product__DescriptionName}>{name}</p>
              <p className={styles.product__DescriptionPrice}>
                ${price.toFixed(2)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsList;
