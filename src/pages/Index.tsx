import Header from "@/components/layout/Header";
import WallGrid from "@/components/walls/WallGrid";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            The Future of <span className="text-primary">Wall Advertising</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect wall owners with advertisers. Rent prime advertising spaces or monetize your walls in India's fastest-growing marketplace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Button asChild size="lg">
                  <Link to="/auth">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="#browse">Browse Walls</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link to="/add-wall">List Your Wall</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose WallSpace?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
              <p className="text-muted-foreground">
                Access to premium wall spaces in high-traffic areas across major cities.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Maximum ROI</h3>
              <p className="text-muted-foreground">
                Optimize your advertising budget with our performance-tracked wall spaces.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
              <p className="text-muted-foreground">
                Safe transactions and verified listings ensure peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Walls Section */}
      <section id="browse" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Wall Spaces</h2>
            <p className="text-muted-foreground text-lg">
              Discover premium advertising spaces perfect for your campaign
            </p>
          </div>
          
          <WallGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of wall owners and advertisers already using WallSpace
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to={user ? "/add-wall" : "/auth"}>
                {user ? "List Your Wall" : "Sign Up Now"}
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Clock className="h-4 w-4 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
