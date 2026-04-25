import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useTheme } from "next-themes";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      data-theme={mounted ? theme : "dark"} 
      className="flex min-h-screen bg-base-100 text-base-content transition-colors duration-300"
    >
      <Sidebar />
      <main className="flex-1 ml-[70px] p-8 md:p-12 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
