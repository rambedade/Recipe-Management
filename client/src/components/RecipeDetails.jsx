import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api";
import styles from "../styles/RecipeDetails.module.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>{recipe.title}</h2>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <img src={recipe.image} alt={recipe.title} className={styles.image} />
    </div>
  );
};

export default RecipeDetails;
