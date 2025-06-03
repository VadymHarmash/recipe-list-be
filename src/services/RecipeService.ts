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
}
