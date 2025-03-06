const express = require("express");
const Recipe = require("../models/recipeModel");

const router = express.Router();

// GET all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new recipe
router.post("/", async (req, res) => {
  const { title, ingredients, instructions, category, image } = req.body;

  if (!title || !ingredients || !instructions || !category || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newRecipe = new Recipe({ title, ingredients, instructions, category, image });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT (update) a recipe
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/random", async (req, res) => {
    try {
      const count = await Recipe.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);
      const randomRecipe = await Recipe.findOne().skip(randomIndex);
  
      if (!randomRecipe) {
        return res.status(404).json({ message: "No recipes found" });
      }
  
      res.json(randomRecipe);
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  });

// GET a single recipe by ID
router.get("/:id", async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
  
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  });
  
 // DELETE a recipe
router.delete("/:id", async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
  
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  });
  
  // GET a random recipe

  


module.exports = router;
