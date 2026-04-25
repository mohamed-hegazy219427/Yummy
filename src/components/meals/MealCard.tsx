import Link from "next/link";
import { Meal } from "../../types/meal";

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-base-200 cursor-pointer aspect-square shadow-md hover:shadow-2xl transition-all duration-500 border border-base-300">
      <Link href={`/meal/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 text-center">
          <h3 className="text-white text-2xl font-bold tracking-tight transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            {meal.strMeal}
          </h3>
        </div>
      </Link>
    </div>
  );
}
