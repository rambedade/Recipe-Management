const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  ingredients: { 
    type: [String], 
    required: [true, "At least one ingredient is required"] 
  },
  instructions: { type: String, required: [true, "Instructions are required"] },
  category: { type: String, required: [true, "Category is required"] },
  image: { type: String, required: [true, "Image URL is required"] },
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
