import { GetStaticProps } from "next";
import Layout from "../components/layout/Layout";
import MealGrid from "../components/meals/MealGrid";
import { mealService } from "../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "../types/meal";

interface HomeProps {
  initialMeals: Meal[];
}

export default function Home({ initialMeals }: HomeProps) {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["meals", ""],
    queryFn: () => mealService.getMealsByName(""),
    initialData: initialMeals,
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 text-base-content">
            Delicious <span className="text-primary">Recipes</span>
          </h1>
          <p className="text-base-content/60 text-lg max-w-2xl">
            Explore a world of flavors with our curated collection of meals from around the globe.
          </p>
        </header>

        <MealGrid meals={meals || []} isLoading={isLoading && !meals} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const meals = await mealService.getMealsByName("");
    return {
      props: {
        initialMeals: meals,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching meals:", error);
    return {
      props: {
        initialMeals: [],
      },
    };
  }
};
