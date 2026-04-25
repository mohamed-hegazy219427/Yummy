import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import MealGrid from "../../components/meals/MealGrid";
import { mealService } from "../../api/mealApi";
import { Meal } from "../../types/meal";
import PageHeader from "../../components/ui/PageHeader";
import AnimatedSection from "../../components/ui/AnimatedSection";

interface AreaDetailProps {
  area: string;
  meals: Meal[];
}

export default function AreaDetail({ area, meals }: AreaDetailProps) {

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
        <MealGrid meals={meals} />
      </section>
    </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const areas = await mealService.getAreas();
  return {
    paths: areas.map((a) => ({ params: { area: a.strArea } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const area = params?.area as string;
  try {
    const meals = await mealService.getMealsByArea(area);
    return {
      props: { area, meals },
      revalidate: 3600,
    };
  } catch {
    return { notFound: true };
  }
};
