import axios from "axios";
import { Meal, Category, Area, Ingredient } from "../types/meal";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});

export const mealService = {
  getMealsByName: async (name: string = ""): Promise<Meal[]> => {
    const { data } = await api.get(`/search.php?s=${name}`);
    return data.meals || [];
  },
  
  getMealById: async (id: string): Promise<Meal | null> => {
    const { data } = await api.get(`/lookup.php?i=${id}`);
    return data.meals?.[0] || null;
  },
  
  getCategories: async (): Promise<Category[]> => {
    const { data } = await api.get("/categories.php");
    return data.categories || [];
  },
  
  getAreas: async (): Promise<Area[]> => {
    const { data } = await api.get("/list.php?a=list");
    return data.meals || [];
  },
  
  getIngredients: async (): Promise<Ingredient[]> => {
    const { data } = await api.get("/list.php?i=list");
    return data.meals || [];
  },
  
  getMealsByCategory: async (category: string): Promise<Meal[]> => {
    const { data } = await api.get(`/filter.php?c=${category}`);
    return data.meals || [];
  },
  
  getMealsByArea: async (area: string): Promise<Meal[]> => {
    const { data } = await api.get(`/filter.php?a=${area}`);
    return data.meals || [];
  },
  
  getMealsByIngredient: async (ingredient: string): Promise<Meal[]> => {
    const { data } = await api.get(`/filter.php?i=${ingredient}`);
    return data.meals || [];
  },
};
