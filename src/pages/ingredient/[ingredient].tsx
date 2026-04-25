import { GetServerSideProps } from "next";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/shared/PageHeader";
import MealGrid from "../../components/meals/MealGrid";
import { mealService } from "../../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "../../types/meal";
import Head from "next/head";

interface IngredientDetailProps {
  ingredient: string;
  initialMeals: Meal[];
}

export default function IngredientDetail({
  ingredient,
  initialMeals,
}: IngredientDetailProps) {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["ingredient", ingredient],
    queryFn: () => mealService.getMealsByIngredient(ingredient),
    initialData: initialMeals,
  });

  return (
    <>
      <Head>
        <title>{ingredient} Recipes — Yummy</title>
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto">
          <PageHeader
            title={ingredient}
            highlight="Recipes"
            subtitle={`Delicious recipes featuring ${ingredient}.`}
          />
          <MealGrid meals={meals || []} isLoading={isLoading && !meals} />
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const ingredient = params?.ingredient as string;
  try {
    const meals = await mealService.getMealsByIngredient(ingredient);
    return {
      props: { ingredient, initialMeals: meals },
    };
  } catch (error) {
    return {
      props: { ingredient, initialMeals: [] },
    };
  }
};
