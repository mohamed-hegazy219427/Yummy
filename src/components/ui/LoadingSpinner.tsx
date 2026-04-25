export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
      <span className="loading loading-infinity loading-lg text-primary scale-150"></span>
      <p className="text-xl font-serif italic opacity-60 animate-pulse">Prepping your feast...</p>
    </div>
  );
}
