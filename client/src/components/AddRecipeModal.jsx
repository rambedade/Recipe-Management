import { useState } from "react";
import Modal from "react-modal";
import { addRecipe } from "../api";
import styles from "../styles/AddRecipeModal.module.css";

Modal.setAppElement("#root");

const AddRecipeModal = ({ isOpen, onClose, setRecipes }) => {
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
    setError("");
  
    if (!formData.title || !formData.ingredients || !formData.instructions || !formData.category || !formData.image) {
      setError("All fields are required!");
      return;
    }
  
    try {
      console.log("Submitting Recipe:", formData);
      const newRecipe = {
        ...formData,
        ingredients: formData.ingredients.split(",").map((ing) => ing.trim()),
      };
  
      const res = await addRecipe(newRecipe);
      console.log("Recipe Added Successfully:", res.data);
  
      if (setRecipes) {
        setRecipes((prev) => [...prev, res.data]); // ✅ Only update if setRecipes is valid
      }
  
      setFormData({ title: "", ingredients: "", instructions: "", category: "", image: "" });
      setError("");
      onClose(); 
    } catch (err) {
      console.error("Error adding recipe:", err.response?.data || err.message);
      setError("Failed to add recipe. " + (err.response?.data?.message || ""));
    }
  };
  
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.modal} overlayClassName={styles.overlay}>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="ingredients" placeholder="Ingredients (comma separated)" value={formData.ingredients} onChange={handleChange} required />
        <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <button type="submit">Add Recipe</button>
        <button type="button" className={styles.closeBtn} onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddRecipeModal;
