import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import MealGrid from "../../components/meals/MealGrid";
import { mealService } from "../../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "../../types/meal";
import PageHeader from "../../components/ui/PageHeader";
import AnimatedSection from "../../components/ui/AnimatedSection";

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
    <>
      <Head>
        <title>Taste of {area} — Yummy</title>
        <meta name="description" content={`Dive into the rich culinary heritage of ${area}. Experience the traditional ingredients and techniques that make this cuisine world-renowned.`} />
      </Head>
      <Layout>
      <AnimatedSection direction="up">
        <PageHeader 
          title="Taste of"
          highlight={area}
          subtitle={`Dive into the rich culinary heritage of ${area}. Experience the traditional ingredients and techniques that make this cuisine world-renowned.`}
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
