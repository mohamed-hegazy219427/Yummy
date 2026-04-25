import { GetServerSideProps } from "next";
import Layout from "../../components/layout/Layout";
import MealGrid from "../../components/meals/MealGrid";
import { mealService } from "../../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "../../types/meal";

interface CategoryDetailProps {
  category: string;
  initialMeals: Meal[];
}

export default function CategoryDetail({ category, initialMeals }: CategoryDetailProps) {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["category", category],
    queryFn: () => mealService.getMealsByCategory(category),
    initialData: initialMeals,
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-base-content">
            {category} <span className="text-primary">Recipes</span>
          </h1>
          <p className="text-base-content/60 text-lg">
            Discover all meals in the {category} category.
          </p>
        </header>

        <MealGrid meals={meals || []} isLoading={isLoading && !meals} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = params?.category as string;
  try {
    const meals = await mealService.getMealsByCategory(category);
    return {
      props: {
        category,
        initialMeals: meals,
      },
    };
  } catch (error) {
    return {
      props: {
        category,
        initialMeals: [],
      },
    };
  }
};
