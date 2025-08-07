import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import WallCard from "./WallCard";
import { Skeleton } from "@/components/ui/skeleton";

const WallGrid = () => {
  const { data: walls, isLoading, error } = useQuery({
    queryKey: ["walls"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("walls")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading walls. Please try again later.</p>
      </div>
    );
  }

  if (!walls || walls.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No walls available yet.</p>
        <p className="text-sm text-muted-foreground mt-2">Be the first to add a wall!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {walls.map((wall) => (
        <WallCard key={wall.id} wall={wall} />
      ))}
    </div>
  );
};

export default WallGrid;