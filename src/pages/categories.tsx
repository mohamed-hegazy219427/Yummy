import { GetStaticProps } from "next";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { mealService } from "../api/mealApi";
import { Category } from "../types/meal";

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-base-content">
            Food <span className="text-primary">Categories</span>
          </h1>
          <p className="text-base-content/60 text-lg max-w-2xl">
            Browse through different food categories to find your next meal.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories?.map((cat) => (
            <div key={cat.idCategory} className="group relative overflow-hidden rounded-2xl bg-base-200 cursor-pointer aspect-square shadow-md hover:shadow-2xl transition-all duration-500 border border-base-300">
              <Link href={`/category/${cat.strCategory}`}>
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-white text-2xl font-bold mb-2">{cat.strCategory}</h3>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {cat.strCategoryDescription}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
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
