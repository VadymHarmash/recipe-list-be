import axios from "axios";
import { IRecipesResponse } from "../types/responses/recipes.response.interface";
import { IRecipeResponse } from "../types/responses/recipe.response.interface";

export class RecipeService {
  private recipesApiUrl = "https://www.themealdb.com/api/json/v1/1/";

  async getRecipes() {
    try {
      const { data } = await axios.get<IRecipesResponse>(
        `${this.recipesApiUrl}search.php?s=`,
      );
      return data;
    } catch (error) {
      console.error("Помилка при запиті до API:", error);
      throw new Error("Не вдалося отримати рецепти");
    }
  }

  async getRecipe(id: number) {
    try {
      const { data } = await axios.get<IRecipeResponse>(
        `${this.recipesApiUrl}lookup.php?i=${id}`,
      );
      return {
        meal: data.meals[0],
      };
    } catch (error) {
      console.error("Помилка при запиті до API:", error);
      throw new Error("Не вдалося отримати рецепти");
    }
  }
  async getRecipesByIngredient(ingredient: string) {
    try {
      const { data } = await axios.get<IRecipesResponse>(
        `${this.recipesApiUrl}filter.php?i=${ingredient}`,
      );
      return data;
    } catch (error) {
      console.error(
        `Error fetching from API by ingredient '${ingredient}':`,
        error,
      );
      throw new Error("Failed to retrieve recipes by ingredient");
    }
  }

  async getRecipesByCountry(country: string) {
    try {
      const { data } = await axios.get<IRecipesResponse>(
        `${this.recipesApiUrl}filter.php?a=${country}`,
      );
      return data;
    } catch (error) {
      console.error(`Error fetching from API by country '${country}':`, error);
      throw new Error("Failed to retrieve recipes by country");
    }
  }

  async getRecipesByCategory(category: string) {
    try {
      const { data } = await axios.get<IRecipesResponse>(
        `${this.recipesApiUrl}filter.php?c=${category}`,
      );
      return data;
    } catch (error) {
      console.error(
        `Error fetching from API by category '${category}':`,
        error,
      );
      throw new Error("Failed to retrieve recipes by category");
    }
  }
}
