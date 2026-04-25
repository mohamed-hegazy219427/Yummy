import { useState } from "react";
import Layout from "../components/layout/Layout";
import MealGrid from "../components/meals/MealGrid";
import { mealService } from "../api/mealApi";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon } from "lucide-react";
import { Input, Label, TextField } from "react-aria-components";

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
            Search <span className="text-primary">Meals</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <TextField className="flex flex-col gap-2">
              <Label className="text-sm font-bold opacity-70">Search by Name</Label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={18} />
                <Input 
                  className="input input-bordered w-full pl-10 bg-base-200 focus:outline-primary"
                  placeholder="Enter meal name..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSearchLetter("");
                  }}
                />
              </div>
            </TextField>

            <TextField className="flex flex-col gap-2">
              <Label className="text-sm font-bold opacity-70">Search by First Letter</Label>
              <Input 
                className="input input-bordered w-full bg-base-200 focus:outline-primary"
                placeholder="Enter a letter..."
                maxLength={1}
                value={searchLetter}
                onChange={(e) => {
                  setSearchLetter(e.target.value);
                  setSearchTerm("");
                }}
              />
            </TextField>
          </div>
        </header>

        <MealGrid meals={meals || []} isLoading={isFetching} />
        
        {!isFetching && (searchTerm || searchLetter) && (!meals || meals.length === 0) && (
          <div className="text-center py-20">
            <p className="text-2xl font-bold opacity-50">No meals found. Try another search!</p>
          </div>
        )}
        {!searchTerm && !searchLetter && !isFetching && (
          <div className="text-center py-20">
            <p className="text-2xl font-bold opacity-50">Start typing to find delicious recipes...</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
