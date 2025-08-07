import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, loading } = useAuth();

  const { data: userWalls, isLoading: wallsLoading } = useQuery({
    queryKey: ["user-walls", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("walls")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: userAds, isLoading: adsLoading } = useQuery({
    queryKey: ["user-ads", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("advertisements")
        .select(`
          *,
          wall:walls(title, location)
        `)
        .eq("advertiser_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Manage your walls and advertisements</p>
          </div>
          <Button asChild>
            <Link to="/add-wall">
              <Plus className="h-4 w-4 mr-2" />
              Add New Wall
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="walls" className="space-y-6">
          <TabsList>
            <TabsTrigger value="walls">My Walls</TabsTrigger>
            <TabsTrigger value="ads">My Advertisements</TabsTrigger>
          </TabsList>

          <TabsContent value="walls" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <CardContent className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))
              ) : userWalls && userWalls.length > 0 ? (
                userWalls.map((wall) => (
                  <Card key={wall.id}>
                    <div className="aspect-video bg-muted relative">
                      {wall.image_url ? (
                        <img
                          src={wall.image_url}
                          alt={wall.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <MapPin className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge variant={wall.is_available ? "default" : "secondary"}>
                          {wall.is_available ? "Available" : "Occupied"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{wall.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{wall.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ₹{wall.price_per_month.toLocaleString()}/month
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">You haven't added any walls yet.</p>
                  <Button asChild className="mt-4">
                    <Link to="/add-wall">Add Your First Wall</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ads" className="space-y-6">
            <div className="space-y-4">
              {adsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))
              ) : userAds && userAds.length > 0 ? (
                userAds.map((ad) => (
                  <Card key={ad.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{ad.title}</CardTitle>
                        <Badge variant={ad.status === "active" ? "default" : "secondary"}>
                          {ad.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        Campaign on: {ad.wall?.title} - {ad.wall?.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Start Date:</span>
                          <p>{new Date(ad.start_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">End Date:</span>
                          <p>{new Date(ad.end_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget:</span>
                          <p className="font-semibold">₹{ad.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <p className="capitalize">{ad.status}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">You haven't created any advertisements yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;