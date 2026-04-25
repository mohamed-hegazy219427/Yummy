import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import MealGrid from "../../components/meals/MealGrid";
import { mealService } from "../../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "../../types/meal";
import PageHeader from "../../components/ui/PageHeader";
import AnimatedSection from "../../components/ui/AnimatedSection";

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
    <>
      <Head>
        <title>{category} Recipes — Yummy</title>
        <meta name="description" content={`Explore our hand-picked collection of ${category.toLowerCase()} recipes. Each dish is selected for its authentic flavor and unique preparation style.`} />
      </Head>
      <Layout>
      <AnimatedSection direction="up">
        <PageHeader 
          title="Delicious"
          highlight={category}
          subtitle={`Explore our hand-picked collection of ${category.toLowerCase()} recipes. Each dish is selected for its authentic flavor and unique preparation style.`}
        />
      </AnimatedSection>

      <section className="mt-12 pt-10 border-t border-base-300">
        <MealGrid meals={meals || []} isLoading={isLoading && !meals} />
      </section>
    </Layout>
    </>
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
