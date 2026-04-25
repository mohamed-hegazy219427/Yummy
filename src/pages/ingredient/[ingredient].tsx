import { GetServerSideProps } from "next";
import Layout from "../../components/layout/Layout";
import MealGrid from "../../components/meals/MealGrid";
import { mealService } from "../../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "../../types/meal";

interface IngredientDetailProps {
  ingredient: string;
  initialMeals: Meal[];
}

export default function IngredientDetail({ ingredient, initialMeals }: IngredientDetailProps) {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["ingredient", ingredient],
    queryFn: () => mealService.getMealsByIngredient(ingredient),
    initialData: initialMeals,
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-base-content">
            {ingredient} <span className="text-primary">Recipes</span>
          </h1>
          <p className="text-base-content/60 text-lg">
            Delicious recipes featuring {ingredient}.
          </p>
        </header>

        <MealGrid meals={meals || []} isLoading={isLoading && !meals} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const ingredient = params?.ingredient as string;
  try {
    const meals = await mealService.getMealsByIngredient(ingredient);
    return {
      props: {
        ingredient,
        initialMeals: meals,
      },
    };
  } catch (error) {
    return {
      props: {
        ingredient,
        initialMeals: [],
      },
    };
  }
};
