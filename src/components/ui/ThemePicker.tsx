import { useEffect } from "react";
import { themeChange } from "theme-change";
import { Palette } from "lucide-react";

const themes = [
  "yummy",
  "dark",
  "light",
  "synthwave",
  "cyberpunk",
  "luxury",
  "nord",
  "sunset",
  "cupcake",
];

export default function ThemePicker() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="dropdown dropdown-top md:dropdown-right">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
        <Palette size={18} />
        <span className="hidden md:inline">Theme</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-50 menu p-2 shadow-2xl bg-base-200 rounded-box w-52 max-h-80 overflow-y-auto border border-base-300"
      >
        {themes.map((theme) => (
          <li key={theme}>
            <button
              data-set-theme={theme}
              data-act-class="active"
              className="capitalize flex items-center justify-between"
            >
              {theme}
              <div className="flex gap-1">
                <div className="w-2 h-4 rounded-full bg-primary"></div>
                <div className="w-2 h-4 rounded-full bg-secondary"></div>
                <div className="w-2 h-4 rounded-full bg-accent"></div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
