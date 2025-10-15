export default function SkeletonCard() {
  return (
    <div className="card-brutal p-5 mb-3 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

