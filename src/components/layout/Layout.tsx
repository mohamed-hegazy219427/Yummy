import React from "react";
import Sidebar from "./Sidebar";
import Footer from "@/components/layout/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-base-100 font-sans selection:bg-primary selection:text-primary-content">
      <Sidebar />
      
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <main className="flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
