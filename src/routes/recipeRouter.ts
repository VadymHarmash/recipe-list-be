import express from "express";
import { RecipeService } from "../services/RecipeService";

const router = express.Router();
const recipeService = new RecipeService();

router.get("/recipes", async (req, res) => {
  try {
    const recipes = await recipeService.getRecipes();
    res.json(recipes);
  } catch (error: any) {
    console.error("Error in /recipes endpoint:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to retrieve recipes" });
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipeService.getRecipe(Number(id));
    if (recipe && recipe.meal) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error: any) {
    console.error(`Error in /recipes/${id} endpoint:`, error);
    res
      .status(500)
      .json({ message: error.message || "Failed to retrieve recipe details" });
  }
});

router.get("/recipes/filter/ingredient/:ingredientName", async (req, res) => {
  const { ingredientName } = req.params;
  try {
    const recipes = await recipeService.getRecipesByIngredient(ingredientName);
    if (recipes && recipes.meals) {
      res.json(recipes);
    } else {
      res.status(404).json({ message: "No recipes found for this ingredient" });
    }
  } catch (error: any) {
    console.error(
      `Error in /recipes/filter/ingredient/${ingredientName} endpoint:`,
      error,
    );
    res
      .status(500)
      .json({
        message: error.message || "Failed to retrieve recipes by ingredient",
      });
  }
});

router.get("/recipes/filter/country/:countryName", async (req, res) => {
  const { countryName } = req.params;
  try {
    const recipes = await recipeService.getRecipesByCountry(countryName);
    if (recipes && recipes.meals) {
      res.json(recipes);
    } else {
      res.status(404).json({ message: "No recipes found for this country" });
    }
  } catch (error: any) {
    console.error(
      `Error in /recipes/filter/country/${countryName} endpoint:`,
      error,
    );
    res
      .status(500)
      .json({
        message: error.message || "Failed to retrieve recipes by country",
      });
  }
});

router.get("/recipes/filter/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  try {
    const recipes = await recipeService.getRecipesByCategory(categoryName);
    if (recipes && recipes.meals) {
      res.json(recipes);
    } else {
      res.status(404).json({ message: "No recipes found for this category" });
    }
  } catch (error: any) {
    console.error(
      `Error in /recipes/filter/category/${categoryName} endpoint:`,
      error,
    );
    res
      .status(500)
      .json({
        message: error.message || "Failed to retrieve recipes by category",
      });
  }
});

export default router;
