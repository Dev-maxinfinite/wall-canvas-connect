import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface WallCardProps {
  wall: {
    id: string;
    title: string;
    description: string;
    location: string;
    price_per_month: number;
    size_width: number;
    size_height: number;
    image_url?: string;
    is_available: boolean;
    visibility_level: string;
  };
}

const WallCard = ({ wall }: WallCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-muted relative">
        {wall.image_url ? (
          <img
            src={wall.image_url}
            alt={wall.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
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
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{wall.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{wall.description}</p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{wall.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {wall.size_width}m × {wall.size_height}m
          </span>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span className="capitalize">{wall.visibility_level}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary">
            ₹{wall.price_per_month.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">per month</span>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link to={`/wall/${wall.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WallCard;