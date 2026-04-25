import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Meal } from "@/types/meal";
import { 
  ExternalLink, 
  MapPin, 
  Tag, 
  Utensils, 
  CheckCircle2, 
  PlayCircle 
} from "lucide-react";
import { TwitterIcon as Youtube } from "../ui/Icons"; // Using Youtube replacement or placeholder
import AnimatedSection from "../ui/AnimatedSection";

interface MealDetailProps {
  meal: Meal;
}

export default function MealDetail({ meal }: MealDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ name: ingredient, measure });
    }
  }

  const tags = meal.strTags ? meal.strTags.split(",") : [];

  useGSAP(() => {
    gsap.from(".detail-image", {
      scale: 1.1,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="detail-image w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/40 to-transparent" />
        
        <div className="absolute bottom-12 left-12 right-12">
          <AnimatedSection direction="up">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="badge badge-primary badge-lg py-4 font-bold">{meal.strCategory}</div>
              <div className="badge badge-outline badge-lg py-4 bg-base-100/20 backdrop-blur-md border-white/20 text-white">
                <MapPin size={16} className="mr-2" /> {meal.strArea}
              </div>
            </div>
            <h1 className="text-6xl md:text-9xl font-black font-serif tracking-tighter text-base-content drop-shadow-xl">
              {meal.strMeal}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Ingredients & Info */}
        <div className="lg:col-span-4 space-y-12">
          <AnimatedSection direction="right" className="space-y-8">
            <div className="bg-base-200 p-10 rounded-[2.5rem] border border-base-300">
              <h2 className="text-3xl font-black font-serif mb-8 flex items-center gap-3">
                <Utensils className="text-primary" /> Ingredients
              </h2>
              <ul className="space-y-4">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between py-3 border-b border-base-300 last:border-0 group">
                    <span className="font-medium group-hover:text-primary transition-colors">{item.name}</span>
                    <span className="badge badge-ghost font-bold">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              {meal.strYoutube && (
                <a 
                  href={meal.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-error btn-lg rounded-2xl text-white font-bold gap-3"
                >
                  <PlayCircle size={24} /> Watch Tutorial
                </a>
              )}
              {meal.strSource && (
                <a 
                  href={meal.strSource} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg rounded-2xl font-bold gap-3"
                >
                  <ExternalLink size={24} /> Original Source
                </a>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* Right Column: Instructions */}
        <div className="lg:col-span-8 space-y-12">
          <AnimatedSection direction="up" className="space-y-10">
            <div>
              <h2 className="text-4xl font-black font-serif mb-8 flex items-center gap-4">
                <CheckCircle2 size={40} className="text-primary" /> 
                Preparation Steps
              </h2>
              <div className="prose prose-xl max-w-none text-base-content/80 leading-relaxed space-y-6">
                {meal.strInstructions?.split("\r\n").map((step, i) => (
                  step.trim() && <p key={i}>{step}</p>
                ))}
              </div>
            </div>

            {tags.length > 0 && (
              <div className="pt-10 border-t border-base-300">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 opacity-60">
                  <Tag size={20} /> Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, idx) => (
                    <div key={idx} className="badge badge-outline badge-lg p-4 opacity-70 hover:opacity-100 hover:border-primary hover:text-primary transition-all cursor-default">
                      #{tag.trim()}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
