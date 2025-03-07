import { useState, useEffect } from "react";
import { getAllRecipes } from "../api";
import DragDropOrganizer from "../components/DragDropOrganizer";
import SurpriseRecipe from "../components/SurpriseRecipe";
import RecipeForm from "../components/RecipeForm";
import EditRecipeModal from "../components/EditRecipeModal";
import styles from "../styles/Home.module.css";

const Home = ({ recipes, setRecipes }) => {
  const [sortedRecipes, setSortedRecipes] = useState([]); // ✅ Store sorted recipes
  const [isSorted, setIsSorted] = useState(false); // ✅ Toggle sorting
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Load recipes when they change
  useEffect(() => {
    setSortedRecipes(recipes);
  }, [recipes]);

  // Handle sorting logic
  const handleSortByCategory = () => {
    if (isSorted) {
      setSortedRecipes(recipes); // Reset to original order
    } else {
      const categorized = {};
      recipes.forEach((recipe) => {
        if (!categorized[recipe.category]) {
          categorized[recipe.category] = [];
        }
        categorized[recipe.category].push(recipe);
      });

      // Flatten categorized object into an array
      const sortedArray = Object.entries(categorized).flatMap(([category, items]) => [
        { type: "category", name: category }, // Category header
        ...items, // Recipes under that category
      ]);

      setSortedRecipes(sortedArray);
    }
    setIsSorted(!isSorted);
  };

  const handleEdit = (recipe) => {
    setRecipeToEdit(recipe);
    setEditModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h2>Recipe Management</h2>
      {/* <RecipeForm setRecipes={setRecipes} /> */}
      <SurpriseRecipe />

      {/* ✅ Add "Sort Recipes" button */}
      <button onClick={handleSortByCategory} className={styles.sortBtn}>
        {isSorted ? "Show All Recipes" : "Sort Recipes by Category"}
      </button>

      <h3>{isSorted ? "Recipes Sorted by Category" : "All Recipes"}</h3>
      <DragDropOrganizer recipes={sortedRecipes} setRecipes={setRecipes} isSorted={isSorted} onEdit={handleEdit} />
      
      <EditRecipeModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} recipeToEdit={recipeToEdit} setRecipes={setRecipes} />
    </div>
  );
};

export default Home;
