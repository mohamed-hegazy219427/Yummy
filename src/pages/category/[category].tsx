import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import MealGrid from "../../components/meals/MealGrid";
import { mealService } from "../../api/mealApi";
import { Meal } from "../../types/meal";
import PageHeader from "../../components/ui/PageHeader";
import AnimatedSection from "../../components/ui/AnimatedSection";

interface CategoryDetailProps {
  category: string;
  meals: Meal[];
}

export default function CategoryDetail({ category, meals }: CategoryDetailProps) {

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
        <MealGrid meals={meals} />
      </section>
    </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await mealService.getCategories();
  return {
    paths: categories.map((c) => ({ params: { category: c.strCategory } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  try {
    const meals = await mealService.getMealsByCategory(category);
    return {
      props: { category, meals },
      revalidate: 3600,
    };
  } catch {
    return { notFound: true };
  }
};
