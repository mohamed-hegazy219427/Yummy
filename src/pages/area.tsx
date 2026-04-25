import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { mealService } from "../api/mealApi";
import { Area } from "../types/meal";
import PageHeader from "../components/ui/PageHeader";
import AreaCard from "../components/ui/AreaCard";
import AnimatedSection from "../components/ui/AnimatedSection";

interface AreaProps {
  areas: Area[];
}

export default function Areas({ areas }: AreaProps) {
  return (
    <>
      <Head>
        <title>World Cuisines — Yummy</title>
        <meta name="description" content="Take your taste buds on a global adventure. Discover traditional dishes and hidden gems from cultures across the planet." />
      </Head>
      <Layout>
      <AnimatedSection direction="up">
        <PageHeader 
          title="World"
          highlight="Cuisine"
          subtitle="Take your taste buds on a global adventure. Discover traditional dishes and hidden gems from cultures across the planet."
        />
      </AnimatedSection>

      <section className="mt-12">
        <AnimatedSection 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"
          stagger={0.05}
        >
          {areas?.map((area) => (
            <AreaCard key={area.strArea} area={area} />
          ))}
        </AnimatedSection>
      </section>
    </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const areas = await mealService.getAreas();
    return {
      props: {
        areas,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching areas:", error);
    return {
      props: {
        areas: [],
      },
    };
  }
};
