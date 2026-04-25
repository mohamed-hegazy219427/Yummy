import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "ghost" | "outline" | "error" | "success";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export default function Badge({ 
  children, 
  variant = "ghost", 
  size = "md", 
  className 
}: BadgeProps) {
  const variants = {
    primary: "badge-primary text-white font-bold",
    secondary: "badge-secondary",
    accent: "badge-accent",
    ghost: "badge-ghost bg-base-200 border-none",
    outline: "badge-outline",
    error: "badge-error text-white",
    success: "badge-success text-white",
  };

  const sizes = {
    xs: "badge-xs",
    sm: "badge-sm",
    md: "badge-md",
    lg: "badge-lg p-4",
  };

  return (
    <div className={cn("badge", variants[variant], sizes[size], className)}>
      {children}
    </div>
  );
}
