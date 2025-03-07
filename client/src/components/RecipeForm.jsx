import { useState } from "react";
import { addRecipe } from "../api";
import styles from "../styles/RecipeForm.module.css";

const RecipeForm = ({ setRecipes }) => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.ingredients || !formData.instructions || !formData.category || !formData.image) {
      setError("All fields are required!");
      return;
    }

    try {
      const newRecipe = {
        ...formData,
        ingredients: formData.ingredients.split(",").map((ing) => ing.trim()), // Convert ingredients to array
      };
      const res = await addRecipe(newRecipe);
      setRecipes((prev) => [...prev, res.data]);
      setFormData({ title: "", ingredients: "", instructions: "", category: "", image: "" });
      setError("");
    } catch (err) {
      setError("Failed to add recipe.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input type="text" name="ingredients" placeholder="Ingredients (comma separated)" value={formData.ingredients} onChange={handleChange} required />
      <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
