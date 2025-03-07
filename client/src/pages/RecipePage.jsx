import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api";
import styles from "../styles/RecipeDetails.module.css";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeById(id)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found!</p>;

  return (
    <div className={styles.container}>
      <h2>{recipe.title}</h2>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <img src={recipe.image} alt={recipe.title} className={styles.image} />
    </div>
  );
};

export default RecipePage;
