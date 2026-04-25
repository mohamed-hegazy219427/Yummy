import { useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".not-found-number", {
      y: -60, opacity: 0, duration: 1, ease: "back.out(1.7)",
    });
    gsap.from(".not-found-text", {
      y: 30, opacity: 0, duration: 0.8, delay: 0.3, ease: "power3.out",
    });
    gsap.from(".not-found-actions", {
      y: 20, opacity: 0, duration: 0.6, delay: 0.6, ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <>
      <Head>
        <title>404 — Page Not Found | Yummy</title>
        <meta name="description" content="This page doesn't exist. Let's get you back to the recipes." />
      </Head>
      <Layout>
        <div ref={containerRef} className="min-h-[70vh] flex flex-col items-center justify-center text-center py-20 space-y-8">
          <div className="not-found-number">
            <span className="text-[10rem] md:text-[18rem] font-black font-serif leading-none text-primary/20 select-none">
              404
            </span>
          </div>
          <div className="not-found-text -mt-8 space-y-4">
            <h1 className="text-4xl md:text-6xl font-black font-serif">Recipe Not Found</h1>
            <p className="text-xl opacity-60 max-w-md mx-auto">
              Looks like this dish isn&apos;t on the menu. Let&apos;s get you back to the kitchen.
            </p>
          </div>
          <div className="not-found-actions flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/" className="btn btn-primary btn-lg rounded-2xl gap-2">
              <Home size={20} /> Back Home
            </Link>
            <Link href="/search" className="btn btn-outline btn-lg rounded-2xl gap-2">
              <Search size={20} /> Search Recipes
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
