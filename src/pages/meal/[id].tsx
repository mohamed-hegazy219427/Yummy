import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import { mealService } from "../../api/mealApi";
import { Meal } from "../../types/meal";
import MealDetail from "../../components/meals/MealDetail";

interface MealPageProps {
  initialMeal: Meal;
}

export default function MealPage({ initialMeal }: MealPageProps) {
  return (
    <>
      <Head>
        <title>{initialMeal.strMeal} — Yummy</title>
        <meta name="description" content={`${initialMeal.strMeal} — a ${initialMeal.strArea} ${initialMeal.strCategory} recipe. Step-by-step instructions and full ingredient list.`} />
      </Head>
      <Layout>
        <MealDetail meal={initialMeal} />
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  try {
    const meal = await mealService.getMealById(id);
    if (!meal) return { notFound: true };
    return {
      props: { initialMeal: meal },
      revalidate: 3600,
    };
  } catch {
    return { notFound: true };
  }
};
