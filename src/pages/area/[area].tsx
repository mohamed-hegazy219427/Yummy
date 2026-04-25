import { GetServerSideProps } from "next";
import Layout from "../../components/layout/Layout";
import MealGrid from "../../components/meals/MealGrid";
import { mealService } from "../../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "../../types/meal";

interface AreaDetailProps {
  area: string;
  initialMeals: Meal[];
}

export default function AreaDetail({ area, initialMeals }: AreaDetailProps) {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["area", area],
    queryFn: () => mealService.getMealsByArea(area),
    initialData: initialMeals,
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-base-content">
            {area} <span className="text-primary">Cuisine</span>
          </h1>
          <p className="text-base-content/60 text-lg">
            Delicious recipes from {area}.
          </p>
        </header>

        <MealGrid meals={meals || []} isLoading={isLoading && !meals} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const area = params?.area as string;
  try {
    const meals = await mealService.getMealsByArea(area);
    return {
      props: {
        area,
        initialMeals: meals,
      },
    };
  } catch (error) {
    return {
      props: {
        area,
        initialMeals: [],
      },
    };
  }
};
