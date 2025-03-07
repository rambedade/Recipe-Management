import { useState } from "react";
import { getRandomRecipe } from "../api";
import { Link } from "react-router-dom";
import styles from "../styles/SurpriseRecipe.module.css";

const SurpriseRecipe = () => {
  const [recipe, setRecipe] = useState(null);

  const fetchRandomRecipe = () => {
    getRandomRecipe()
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.surpriseContainer}>
      <button onClick={fetchRandomRecipe} className={styles.surpriseBtn}>
        Surprise Me!
      </button>

      {recipe && (
        <div className={styles.recipeCard}>
          <Link to={`/recipe/${recipe._id}`} className={styles.recipeLink}>
            <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
            <p className={styles.recipeTitle}>{recipe.title}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SurpriseRecipe;
    