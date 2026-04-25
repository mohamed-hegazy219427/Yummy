import { GetStaticProps } from "next";
import Layout from "../components/layout/Layout";
import { mealService } from "../api/mealApi";
import { Ingredient } from "../types/meal";
import PageHeader from "../components/ui/PageHeader";
import IngredientCard from "../components/ui/IngredientCard";
import AnimatedSection from "../components/ui/AnimatedSection";

interface IngredientsProps {
  ingredients: Ingredient[];
}

export default function Ingredients({ ingredients }: IngredientsProps) {
  return (
    <Layout>
      <AnimatedSection direction="up">
        <PageHeader 
          title="Fresh"
          highlight="Ingredients"
          subtitle="Explore recipes based on their core components. Learn about the building blocks of flavor and find new ways to use your favorite staples."
        />
      </AnimatedSection>

      <section className="mt-12">
        <AnimatedSection 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
          stagger={0.05}
        >
          {ingredients?.slice(0, 48).map((ing) => (
            <IngredientCard key={ing.idIngredient} ingredient={ing} />
          ))}
        </AnimatedSection>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const ingredients = await mealService.getIngredients();
    return {
      props: {
        ingredients,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return {
      props: {
        ingredients: [],
      },
    };
  }
};
