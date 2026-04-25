import Link from "next/link";
import { Area } from "@/types/meal";
import { MapPin, ChefHat } from "lucide-react";

interface AreaCardProps {
  area: Area;
}

export default function AreaCard({ area }: AreaCardProps) {
  return (
    <Link 
      href={`/area/${area.strArea}`}
      className="group relative p-10 rounded-3xl bg-base-200 hover:bg-primary transition-all duration-500 shadow-sm hover:shadow-xl border border-base-300 flex flex-col items-center text-center gap-6"
    >
      <div className="w-20 h-20 rounded-2xl bg-base-100 group-hover:bg-primary-content/20 flex items-center justify-center text-primary group-hover:text-primary-content transition-colors shadow-inner">
        <MapPin size={40} strokeWidth={1.5} />
      </div>
      
      <div>
        <h3 className="text-2xl font-black group-hover:text-primary-content mb-1">{area.strArea}</h3>
        <div className="flex items-center justify-center gap-2 text-sm opacity-50 group-hover:text-primary-content group-hover:opacity-80">
          <ChefHat size={14} /> Local Recipes
        </div>
      </div>
    </Link>
  );
}
