import { GetServerSideProps } from "next";
import Layout from "../../components/layout/Layout";
import MealGrid from "../../components/meals/MealGrid";
import { mealService } from "../../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "../../types/meal";
import PageHeader from "../../components/ui/PageHeader";
import AnimatedSection from "../../components/ui/AnimatedSection";

interface IngredientDetailProps {
  ingredient: string;
  initialMeals: Meal[];
}

export default function IngredientDetail({ ingredient, initialMeals }: IngredientDetailProps) {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["ingredient", ingredient],
    queryFn: () => mealService.getMealsByIngredient(ingredient),
    initialData: initialMeals,
  });

  return (
    <Layout>
      <AnimatedSection direction="up">
        <PageHeader 
          title="Cooking with"
          highlight={ingredient}
          subtitle={`Unlock the potential of ${ingredient.toLowerCase()}. Discover creative and delicious ways to make this ingredient the star of your next meal.`}
        />
      </AnimatedSection>

      <section className="mt-12 pt-10 border-t border-base-300">
        <MealGrid meals={meals || []} isLoading={isLoading && !meals} />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const ingredient = params?.ingredient as string;
  try {
    const meals = await mealService.getMealsByIngredient(ingredient);
    return {
      props: {
        ingredient,
        initialMeals: meals,
      },
    };
  } catch (error) {
    return {
      props: {
        ingredient,
        initialMeals: [],
      },
    };
  }
};
