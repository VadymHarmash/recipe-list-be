import express from "express";
import { RecipeService } from "../services/RecipeService";

const router = express.Router();
const recipeService = new RecipeService();

router.get("/recipes", async (req, res) => {
  const recipes = await recipeService.getRecipes();
  res.json(recipes);
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.getRecipe(Number(id));

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
});

export default router;
