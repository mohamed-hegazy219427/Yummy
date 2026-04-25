import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Search as SearchIcon } from "lucide-react";
import { Input, Label, TextField } from "react-aria-components";

interface SearchSectionProps {
  searchTerm: string;
  searchLetter: string;
  onSearchTermChange: (value: string) => void;
  onSearchLetterChange: (value: string) => void;
}

export default function SearchSection({
  searchTerm,
  searchLetter,
  onSearchTermChange,
  onSearchLetterChange,
}: SearchSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="glass-card rounded-3xl p-8 md:p-10 mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <SearchIcon className="text-primary" size={20} />
        </div>
        <h2 className="text-xl font-bold text-base-content">
          Find Your Next Meal
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField className="flex flex-col gap-2">
          <Label className="text-sm font-semibold text-base-content/60 tracking-wide uppercase">
            Search by Name
          </Label>
          <div className="relative">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30"
              size={18}
            />
            <Input
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-base-200/50 border border-base-300/50 text-base-content placeholder:text-base-content/30 transition-all duration-300 outline-none search-input-glow"
              placeholder="Try 'Arrabiata' or 'Chicken'..."
              value={searchTerm}
              onChange={(e) => {
                onSearchTermChange(e.target.value);
                onSearchLetterChange("");
              }}
            />
          </div>
        </TextField>

        <TextField className="flex flex-col gap-2">
          <Label className="text-sm font-semibold text-base-content/60 tracking-wide uppercase">
            Search by First Letter
          </Label>
          <Input
            className="w-full px-4 py-3.5 rounded-xl bg-base-200/50 border border-base-300/50 text-base-content placeholder:text-base-content/30 transition-all duration-300 outline-none search-input-glow text-center text-2xl font-bold tracking-widest"
            placeholder="A"
            maxLength={1}
            value={searchLetter}
            onChange={(e) => {
              onSearchLetterChange(e.target.value);
              onSearchTermChange("");
            }}
          />
        </TextField>
      </div>
    </div>
  );
}
