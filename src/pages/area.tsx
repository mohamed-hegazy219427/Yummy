import { GetStaticProps } from "next";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { mealService } from "../api/mealApi";
import { Area } from "../types/meal";

interface AreaProps {
  areas: Area[];
}

export default function Areas({ areas }: AreaProps) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-base-content">
            Cuisine <span className="text-primary">Areas</span>
          </h1>
          <p className="text-base-content/60 text-lg max-w-2xl">
            Explore recipes by their geographical origin.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {areas?.map((area) => (
            <Link 
              key={area.strArea} 
              href={`/area/${area.strArea}`}
              className="group flex flex-col items-center justify-center p-8 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-2 border border-base-300"
            >
              <MapPin size={48} className="mb-4 text-primary group-hover:text-white transition-colors" />
              <h3 className="text-xl font-bold">{area.strArea}</h3>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
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
