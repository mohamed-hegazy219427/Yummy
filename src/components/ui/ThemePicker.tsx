import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { Palette, Check } from "lucide-react";

const themes = [
  { id: "yummy",     label: "Yummy"     },
  { id: "dark",      label: "Dark"      },
  { id: "light",     label: "Light"     },
  { id: "synthwave", label: "Synthwave" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "luxury",    label: "Luxury"    },
  { id: "nord",      label: "Nord"      },
  { id: "sunset",    label: "Sunset"    },
  { id: "cupcake",   label: "Cupcake"   },
];

export default function ThemePicker() {
  const [current, setCurrent] = useState("yummy");

  useEffect(() => {
    themeChange(false);

    // Read initial theme
    const saved = document.documentElement.getAttribute("data-theme") || "yummy";
    setCurrent(saved);

    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") || "yummy";
      setCurrent(t);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="dropdown dropdown-top">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm w-full justify-start gap-2 px-3 hover:bg-base-300 rounded-xl"
      >
        <Palette size={15} className="text-primary shrink-0" />
        <span className="text-sm font-semibold capitalize flex-1 text-left">{current}</span>
        {/* Current theme color dots */}
        <div className="flex gap-0.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content z-100 p-1.5 shadow-2xl bg-base-100 border border-base-300 rounded-2xl w-56 max-h-72 overflow-y-auto space-y-0.5"
      >
        {themes.map(({ id, label }) => (
          // data-theme on the <li> scopes the color dots to that theme's palette
          <li key={id} data-theme={id}>
            <button
              data-set-theme={id}
              data-act-class="IGNORED"
              onClick={() => setCurrent(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 ${
                current === id
                  ? "bg-primary/15 text-primary"
                  : "text-base-content hover:bg-base-200"
              }`}
            >
              {/* Swatches rendered inside data-theme scope */}
              <div className="flex gap-1 shrink-0">
                <div className="w-3 h-3 rounded-full bg-primary shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-secondary shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-accent shadow-sm" />
              </div>

              <span className="flex-1 text-left">{label}</span>

              {current === id && (
                <Check size={13} className="text-primary shrink-0" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
