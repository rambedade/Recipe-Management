import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getAllRecipes = () => API.get("/recipes");
export const getRecipeById = (id) => API.get(`/recipes/${id}`);
export const addRecipe = (recipe) => API.post("/recipes", recipe);
export const updateRecipe = (id, updatedRecipe) => API.put(`/recipes/${id}`, updatedRecipe);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);
export const getRandomRecipe = () => API.get("/recipes/random");
