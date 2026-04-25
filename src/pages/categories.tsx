import { GetStaticProps } from "next";
import Layout from "../components/layout/Layout";
import { mealService } from "../api/mealApi";
import { Category } from "../types/meal";
import PageHeader from "../components/ui/PageHeader";
import CategoryCard from "../components/ui/CategoryCard";
import AnimatedSection from "../components/ui/AnimatedSection";

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <Layout>
      <AnimatedSection direction="up">
        <PageHeader 
          title="Browse by"
          highlight="Category"
          subtitle="Explore our diverse range of food categories. Whether you're in the mood for something light or a hearty feast, we have you covered."
        />
      </AnimatedSection>

      <section className="mt-12">
        <AnimatedSection 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12"
          stagger={0.1}
        >
          {categories?.map((cat) => (
            <CategoryCard key={cat.idCategory} category={cat} />
          ))}
        </AnimatedSection>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const categories = await mealService.getCategories();
    return {
      props: {
        categories,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
};
