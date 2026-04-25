import { Meal } from "../../types/meal";
import MealCard from "./MealCard";

interface MealGridProps {
  meals: Meal[];
  isLoading?: boolean;
}

export default function MealGrid({ meals, isLoading }: MealGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl font-bold opacity-50">No meals found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
