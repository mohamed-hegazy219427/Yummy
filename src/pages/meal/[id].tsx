import { GetServerSideProps } from "next";
import Layout from "../../components/layout/Layout";
import { mealService } from "../../api/mealApi";
import { Meal } from "../../types/meal";
import MealDetail from "../../components/meals/MealDetail";

interface MealPageProps {
  id: string;
  initialMeal: Meal;
}

export default function MealPage({ id, initialMeal }: MealPageProps) {
  return (
    <Layout>
      <MealDetail meal={initialMeal} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  try {
    const meal = await mealService.getMealById(id);
    if (!meal) {
      return { notFound: true };
    }
    return {
      props: {
        id,
        initialMeal: meal,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
