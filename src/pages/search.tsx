import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import MealGrid from "../components/meals/MealGrid";
import { mealService } from "../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, Filter } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import AnimatedSection from "../components/ui/AnimatedSection";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLetter, setSearchLetter] = useState("");

  const { data: meals, isFetching } = useQuery({
    queryKey: ["search", searchTerm, searchLetter],
    queryFn: async () => {
      if (searchLetter) {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`);
        const data = await res.json();
        return data.meals || [];
      }
      return mealService.getMealsByName(searchTerm);
    },
    enabled: searchTerm.length > 0 || searchLetter.length > 0,
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <>
      <Head>
        <title>Search Recipes — Yummy</title>
        <meta name="description" content="Search through our database by name or explore recipes by their starting letter. Your perfect meal is just a few keystrokes away." />
      </Head>
      <Layout>
      <AnimatedSection direction="up">
        <PageHeader 
          title="Find Your"
          highlight="Flavor"
          subtitle="Search through our database by name or explore recipes by their starting letter. Your perfect meal is just a few keystrokes away."
        />
      </AnimatedSection>
      
      <section className="space-y-16">
        {/* Search Controls */}
        <AnimatedSection direction="up" delay={0.2} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
             <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold opacity-60 flex items-center gap-2"><SearchIcon size={14} /> Search by Name</span>
              </div>
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
                <input 
                  type="text" 
                  placeholder="e.g. Sushi, Burger, Pasta..." 
                  className="input input-bordered input-lg w-full pl-12 rounded-2xl bg-base-200 focus:input-primary transition-all"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSearchLetter("");
                  }}
                />
              </div>
            </label>
          </div>

          <div className="lg:col-span-5">
            <div className="label">
              <span className="label-text font-bold opacity-60 flex items-center gap-2"><Filter size={14} /> Quick Filter</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setSearchLetter(letter);
                    setSearchTerm("");
                  }}
                  className={`btn btn-sm btn-square rounded-lg uppercase ${searchLetter === letter ? "btn-primary" : "btn-ghost bg-base-200"}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Results */}
        <div className="pt-10 border-t border-base-300">
          <MealGrid meals={meals || []} isLoading={isFetching} />
          
          {!isFetching && (searchTerm || searchLetter) && (!meals || meals.length === 0) && (
            <div className="text-center py-32 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-300">
               <p className="text-3xl font-serif italic opacity-30">We couldn't find any recipes matching your search...</p>
               <button onClick={() => {setSearchTerm(""); setSearchLetter("")}} className="btn btn-ghost mt-6 underline">Clear Search</button>
            </div>
          )}
          
          {!searchTerm && !searchLetter && !isFetching && (
            <div className="text-center py-32 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-300">
               <p className="text-3xl font-serif italic opacity-30">Start typing or pick a letter to find inspiration...</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
    </>
  );
}
