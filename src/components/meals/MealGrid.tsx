import { Meal } from "@/types/meal";
import MealCard from "./MealCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import AnimatedSection from "../ui/AnimatedSection";

interface MealGridProps {
  meals: Meal[];
  isLoading?: boolean;
}

export default function MealGrid({ meals, isLoading }: MealGridProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-32 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-300">
        <p className="text-3xl font-serif italic opacity-30">No recipes found in this pantry...</p>
      </div>
    );
  }

  return (
    <AnimatedSection 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12"
      stagger={0.1}
    >
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </AnimatedSection>
  );
}
