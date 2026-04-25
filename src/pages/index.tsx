import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import MealGrid from "../components/meals/MealGrid";
import { mealService } from "../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "../types/meal";
import PageHeader from "../components/ui/PageHeader";
import AnimatedSection from "../components/ui/AnimatedSection";

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
    <>
      <Head>
        <title>Yummy — Discover World Recipes</title>
        <meta name="description" content="Explore thousands of mouth-watering recipes from every corner of the globe. From simple snacks to gourmet feasts, your culinary journey starts here." />
      </Head>
      <Layout>
      <AnimatedSection direction="up" delay={0.2}>
        <PageHeader 
          title="Master Your"
          highlight="Kitchen"
          subtitle="Explore thousands of mouth-watering recipes from every corner of the globe. From simple snacks to gourmet feasts, your culinary journey starts here."
        />
      </AnimatedSection>

      <section className="mt-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black font-serif">Featured <span className="text-primary">Recipes</span></h2>
          <div className="h-px bg-base-300 flex-1 mx-8 hidden md:block"></div>
          <span className="badge badge-ghost font-bold py-4">Worldwide Cuisine</span>
        </div>
        
        <MealGrid meals={meals || []} isLoading={isLoading && !meals} />
      </section>
    </Layout>
    </>
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
