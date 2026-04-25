import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiError } from "@/api/mealApi";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PageTransition from "@/components/transitions/PageTransition";

// Register GSAP plugins once at app level
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function App({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            // Never retry 4xx — those are permanent client errors
            retry: (count, err) => {
              if (err instanceof ApiError && err.status !== undefined && err.status < 500) return false;
              return count < 2;
            },
          },
        },
      })
  );

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PageTransition routeKey={router.asPath}>
        <Component {...pageProps} />
      </PageTransition>
    </QueryClientProvider>
  );
}
