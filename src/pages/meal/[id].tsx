import { GetServerSideProps } from "next";
import Layout from "../../components/layout/Layout";
import { mealService } from "../../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Youtube, ExternalLink, MapPin, Tag, Utensils } from "lucide-react";
import Badge from "../../components/ui/Badge";
import { Meal } from "../../types/meal";

interface MealDetailProps {
  id: string;
  initialMeal: Meal;
}

export default function MealDetail({ id, initialMeal }: MealDetailProps) {
  const { data: meal } = useQuery({
    queryKey: ["meal", id],
    queryFn: () => mealService.getMealById(id),
    initialData: initialMeal,
  });

  if (!meal) return <Layout><div>Meal not found</div></Layout>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  const tags = meal.strTags ? meal.strTags.split(",") : [];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="sticky top-12">
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="w-full rounded-3xl shadow-2xl mb-6"
              />
              <h1 className="text-4xl font-black mb-4 text-base-content">{meal.strMeal}</h1>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {meal.strYoutube && (
                  <a href={meal.strYoutube} target="_blank" className="btn btn-error btn-sm text-white">
                    <Youtube size={16} /> Youtube
                  </a>
                )}
                {meal.strSource && (
                  <a href={meal.strSource} target="_blank" className="btn btn-success btn-sm text-white">
                    <ExternalLink size={16} /> Source
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-base-content">
                <Utensils className="text-primary" /> Instructions
              </h2>
              <p className="text-base-content/80 leading-relaxed whitespace-pre-line text-lg">
                {meal.strInstructions}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-base-content">
                        <MapPin className="text-primary" /> Origin
                    </h3>
                    <Badge size="lg" variant="outline">{meal.strArea}</Badge>
                </section>
                <section>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-base-content">
                        <Tag className="text-primary" /> Category
                    </h3>
                    <Badge size="lg" variant="primary">{meal.strCategory}</Badge>
                </section>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-base-content">Recipes</h2>
              <div className="flex flex-wrap gap-3">
                {ingredients.map((item, idx) => (
                  <Badge key={idx} size="lg" variant="ghost">
                    {item}
                  </Badge>
                ))}
              </div>
            </section>

            {tags.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 text-base-content">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="badge-outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  try {
    const meal = await mealService.getMealById(id);
    return {
      props: {
        id,
        initialMeal: meal,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
