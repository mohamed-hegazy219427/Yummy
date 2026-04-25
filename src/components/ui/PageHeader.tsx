import { cn } from "@/lib/cn";

interface PageHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({ title, highlight, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-16 space-y-4", className)}>
      <h1 className="text-5xl md:text-8xl font-black font-serif tracking-tighter leading-tight">
        {title} {highlight && <span className="text-primary block md:inline-block italic">{highlight}</span>}
      </h1>
      {subtitle && (
        <p className="text-xl md:text-2xl text-base-content/60 max-w-3xl leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-2 bg-primary rounded-full mt-8"></div>
    </div>
  );
}
