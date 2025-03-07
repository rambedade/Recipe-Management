import { useState, useEffect } from "react";
import { getAllRecipes } from "../api";
import { Link } from "react-router-dom";
import styles from "../styles/RecipeList.module.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes()
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.recipeGrid}>
      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe._id}`} key={recipe._id} className={styles.recipeCard}>
          <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
          <p className={styles.recipeTitle}>{recipe.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
