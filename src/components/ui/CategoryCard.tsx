import Link from "next/link";
import { Category } from "@/types/meal";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/category/${category.strCategory}`}
      className="group relative overflow-hidden rounded-3xl bg-base-200 aspect-[4/5] shadow-sm hover:shadow-2xl transition-all duration-500 border border-base-300 flex flex-col"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={category.strCategoryThumb}
          alt={category.strCategory}
          className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
        />
      </div>
      
      <div className="mt-auto relative z-10 p-8 bg-linear-to-t from-base-300 via-base-300/80 to-transparent pt-20">
        <h3 className="text-3xl font-black font-serif mb-2">{category.strCategory}</h3>
        <p className="text-sm opacity-60 line-clamp-2 mb-4 group-hover:opacity-100 transition-opacity">
          {category.strCategoryDescription}
        </p>
        <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
          Explore Recipes <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
