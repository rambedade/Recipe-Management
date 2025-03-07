import { useState, useEffect } from "react";
import Modal from "react-modal";
import { updateRecipe } from "../api";
import styles from "../styles/EditRecipeModal.module.css";

Modal.setAppElement("#root");

const EditRecipeModal = ({ isOpen, onClose, recipeToEdit, setRecipes }) => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: "",
  });
  const [error, setError] = useState("");

  // Populate form when a recipe is selected for editing
  useEffect(() => {
    if (recipeToEdit) {
      setFormData({
        title: recipeToEdit.title,
        ingredients: recipeToEdit.ingredients.join(", "), // Convert array to string
        instructions: recipeToEdit.instructions,
        category: recipeToEdit.category,
        image: recipeToEdit.image,
      });
    }
  }, [recipeToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.ingredients || !formData.instructions || !formData.category || !formData.image) {
      setError("All fields are required!");
      return;
    }

    try {
      const updatedRecipe = {
        ...formData,
        ingredients: formData.ingredients.split(",").map((ing) => ing.trim()),
      };

      const res = await updateRecipe(recipeToEdit._id, updatedRecipe);
      console.log("Recipe Updated Successfully:", res.data);

      setRecipes((prev) =>
        prev.map((recipe) => (recipe._id === recipeToEdit._id ? res.data : recipe))
      );

      onClose();
    } catch (err) {
      console.error("Error updating recipe:", err.response?.data || err.message);
      setError("Failed to update recipe.");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.modal} overlayClassName={styles.overlay}>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="ingredients" placeholder="Ingredients (comma separated)" value={formData.ingredients} onChange={handleChange} required />
        <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <button type="submit">Save Changes</button>
        <button type="button" className={styles.closeBtn} onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default EditRecipeModal;
