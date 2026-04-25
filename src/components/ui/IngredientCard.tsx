import Link from "next/link";
import { Ingredient } from "@/types/meal";
import { Utensils } from "lucide-react";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <Link 
      href={`/ingredient/${ingredient.strIngredient}`}
      className="group p-8 rounded-3xl bg-base-200 hover:bg-base-300 transition-all duration-300 border border-base-300 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <Utensils size={24} />
        </div>
        <div className="badge badge-outline badge-sm opacity-40 group-hover:opacity-100">Ingredient</div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{ingredient.strIngredient}</h3>
        <p className="text-sm opacity-60 line-clamp-3 leading-relaxed">
          {ingredient.strDescription || "Essential ingredient for many world-class recipes. Explore how to use it in your next dish."}
        </p>
      </div>
    </Link>
  );
}
