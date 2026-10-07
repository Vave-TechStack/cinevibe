import { SearchX, AlertTriangle, Loader2, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[2/3] rounded-2xl bg-white/5" />
          <div className="mt-3 h-4 w-3/4 rounded bg-white/5" />
          <div className="mt-2 h-3 w-1/2 rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your search or filters.",
  actionLabel,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-cinema-border bg-cinema-card/50 p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        <SearchX className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-400">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/5 p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-400">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="destructive" className="mt-6">
          Try Again
        </Button>
      )}
    </div>
  );
}

export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-cinema-gold" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}

export function MovieNotFound() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-cinema-border bg-cinema-card/50 p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        <Clapperboard className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-bold text-white">Movie not found</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-400">
        The movie you are looking for is not available or has been removed.
      </p>
    </div>
  );
}
