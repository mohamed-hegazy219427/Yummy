import Link from "next/link";
import Image from "next/image";
import { Meal } from "@/types/meal";
import { ArrowUpRight, Clock, Utensils } from "lucide-react";

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] bg-base-200 aspect-3/4 shadow-md hover:shadow-2xl transition-all duration-700 border border-base-300">
      <Link href={`/meal/${meal.idMeal}`} className="block h-full">
        {/* Image with zoom effect */}
        <div className="absolute inset-0">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Branded overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        </div>

        {/* Floating Tag */}
        <div className="absolute top-6 right-6 z-10">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
             <Utensils size={12} /> Recipe
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              <Clock size={14} /> Quick Prep
            </div>
            
            <h3 className="text-white text-3xl font-black font-serif leading-tight">
              {meal.strMeal}
            </h3>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-white/60 text-sm font-medium">View Details</span>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content transform -rotate-45 group-hover:rotate-0 transition-transform shadow-lg shadow-primary/20">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
