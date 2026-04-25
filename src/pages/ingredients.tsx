import { GetStaticProps } from "next";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { Beef } from "lucide-react";
import { mealService } from "../api/mealApi";
import { Ingredient } from "../types/meal";

interface IngredientsProps {
  ingredients: Ingredient[];
}

export default function Ingredients({ ingredients }: IngredientsProps) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-base-content">
            Recipe <span className="text-primary">Ingredients</span>
          </h1>
          <p className="text-base-content/60 text-lg max-w-2xl">
            Find recipes based on their main ingredients.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ingredients?.slice(0, 24).map((ing) => (
            <Link 
              key={ing.idIngredient} 
              href={`/ingredient/${ing.strIngredient}`}
              className="group flex flex-col items-center p-8 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl text-center border border-base-300"
            >
              <Beef size={48} className="mb-4 text-primary group-hover:text-white transition-colors" />
              <h3 className="text-xl font-bold mb-2">{ing.strIngredient}</h3>
              <p className="text-sm opacity-60 line-clamp-2 group-hover:text-white/80 transition-colors">
                {ing.strDescription || "No description available for this ingredient."}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const ingredients = await mealService.getIngredients();
    return {
      props: {
        ingredients,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return {
      props: {
        ingredients: [],
      },
    };
  }
};
