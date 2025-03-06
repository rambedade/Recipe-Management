require("dotenv").config();
const mongoose = require("mongoose");
const Recipe = require("./models/recipeModel");
const connectDB = require("./config/db");
const data = require("./data.json");

// Extract recipes array
const recipes = data.recipes;

connectDB();

const seedRecipes = async () => {
  try {
    await Recipe.deleteMany();
    console.log("Existing recipes removed");

    // Debug: Log first recipe to ensure correct structure
    console.log("First recipe:", recipes[0]);

    // Ensure the correct field names
    const formattedRecipes = recipes.map(recipe => ({
      title: recipe.name, // Rename "name" to "title"
      ingredients: recipe.ingredients,
      instructions: recipe.instructions.join("\n"), // Convert array to a string
      category: recipe.cuisine, // Use cuisine as category
      image: recipe.image
    }));

    await Recipe.insertMany(formattedRecipes);
    console.log("Recipes seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedRecipes();
