
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Filter, MapPin, Search, Star } from "lucide-react";

// Mock factory data
const mockFactories = [
  {
    id: "cairo-crafts",
    name: "Cairo Crafts Ltd.",
    logo: "https://via.placeholder.com/150",
    location: "Cairo, Egypt",
    categories: ["Furniture", "Home Goods", "Handicrafts"],
    description: "Cairo Crafts is a leading manufacturer of handcrafted furniture and home goods, specializing in traditional Egyptian designs with modern functionality.",
    certifications: ["ISO 9001:2015", "FSC Certified", "Export Ready"],
    rating: 4.8,
    reviewCount: 24,
    featuredImage: "https://via.placeholder.com/600x400",
    verified: true
  },
  {
    id: "alexandria-textiles",
    name: "Alexandria Textiles",
    logo: "https://via.placeholder.com/150",
    location: "Alexandria, Egypt",
    categories: ["Textiles", "Home Textiles", "Apparel"],
    description: "Alexandria Textiles produces premium Egyptian cotton products with a focus on sustainability and ethical manufacturing practices.",
    certifications: ["ISO 9001:2015", "GOTS Certified", "Fair Trade"],
    rating: 4.6,
    reviewCount: 32,
    featuredImage: "https://via.placeholder.com/600x400",
    verified: true
  },
  {
    id: "nile-ceramics",
    name: "Nile Ceramics",
    logo: "https://via.placeholder.com/150",
    location: "Aswan, Egypt",
    categories: ["Home Goods", "Ceramics", "Tableware"],
    description: "Nile Ceramics combines traditional Egyptian pottery techniques with modern design to create beautiful, functional ceramics.",
    certifications: ["Handcrafted Certification"],
    rating: 4.2,
    reviewCount: 18,
    featuredImage: "https://via.placeholder.com/600x400",
    verified: true
  },
  {
    id: "delta-foods",
    name: "Delta Foods",
    logo: "https://via.placeholder.com/150",
    location: "Damietta, Egypt",
    categories: ["Food & Beverages", "Organic", "Spices"],
    description: "Delta Foods exports authentic Egyptian food products including spices, herbs, and specialty ingredients.",
    certifications: ["HACCP Certified", "ISO 22000", "Organic Certified"],
    rating: 4.7,
    reviewCount: 29,
    featuredImage: "https://via.placeholder.com/600x400",
    verified: true
  },
  {
    id: "luxor-leather",
    name: "Luxor Leather",
    logo: "https://via.placeholder.com/150",
    location: "Luxor, Egypt",
    categories: ["Leather Goods", "Accessories", "Footwear"],
    description: "Luxor Leather crafts premium leather products using traditional tanning methods and modern designs.",
    certifications: ["Leather Working Group"],
    rating: 4.5,
    reviewCount: 21,
    featuredImage: "https://via.placeholder.com/600x400",
    verified: false
  },
  {
    id: "egyptian-essentials",
    name: "Egyptian Essentials",
    logo: "https://via.placeholder.com/150",
    location: "Faiyum, Egypt",
    categories: ["Cosmetics", "Essential Oils", "Natural Products"],
    description: "Egyptian Essentials produces natural beauty and wellness products using authentic Egyptian ingredients.",
    certifications: ["Natural Product Association", "Cruelty-Free"],
    rating: 4.4,
    reviewCount: 16,
    featuredImage: "https://via.placeholder.com/600x400",
    verified: false
  },
];

// Categories
const productCategories = [
  "All Categories",
  "Furniture",
  "Textiles",
  "Home Goods",
  "Food & Beverages",
  "Ceramics",
  "Leather Goods",
  "Cosmetics",
  "Handicrafts",
  "Apparel",
];

// Locations
const locations = [
  "All Locations",
  "Cairo",
  "Alexandria",
  "Luxor",
  "Aswan",
  "Damietta",
  "Faiyum",
];

export default function FactoryDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  // Filter factories based on search, category, and location
  const filteredFactories = mockFactories.filter((factory) => {
    const matchesSearch =
      factory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      factory.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All Categories" ||
      factory.categories.some((category) => category === selectedCategory);
    
    const matchesLocation =
      selectedLocation === "All Locations" ||
      factory.location.includes(selectedLocation);
    
    const matchesVerified = showVerifiedOnly ? factory.verified : true;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesVerified;
  });

  return (
    <div className="container py-8 space-y-6">
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Egyptian Factories Directory</h1>
        <p className="text-muted-foreground text-lg">
          Browse our curated list of verified Egyptian manufacturers ready for export
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Filter Factories</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      Category
                    </label>
                    <Select 
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      Location
                    </label>
                    <Select 
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      id="verified"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={showVerifiedOnly}
                      onChange={() => setShowVerifiedOnly(!showVerifiedOnly)}
                    />
                    <label
                      htmlFor="verified"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Verified factories only
                    </label>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full flex items-center gap-1">
                    <Filter className="h-4 w-4 mr-1" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <h3 className="font-medium">Looking for specific products?</h3>
                <p className="text-sm text-muted-foreground">
                  Browse our product marketplace to find specific items for export.
                </p>
                <Button variant="default" className="w-full">
                  Product Marketplace
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:max-w-md">
              <Input
                placeholder="Search factories by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredFactories.length} factories found
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredFactories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
                <h3 className="text-xl font-medium">No factories found</h3>
                <p className="text-muted-foreground text-center mt-2 max-w-md">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              filteredFactories.map((factory) => (
                <Card key={factory.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img
                        src={factory.featuredImage}
                        alt={factory.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <div className="flex items-center">
                          <img
                            src={factory.logo}
                            alt={`${factory.name} logo`}
                            className="h-10 w-10 rounded-md mr-3 object-contain"
                          />
                          <div>
                            <h3 className="text-lg font-semibold">{factory.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              {factory.location}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 font-medium">{factory.rating}</span>
                          </div>
                          <span className="mx-2 text-muted-foreground text-xs">
                            ({factory.reviewCount} reviews)
                          </span>
                          {factory.verified && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {factory.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {factory.categories.map((category, index) => (
                          <Badge key={index} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {factory.certifications.slice(0, 2).map((cert, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                          {factory.certifications.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{factory.certifications.length - 2} more
                            </Badge>
                          )}
                        </div>
                        
                        <Button asChild>
                          <Link to={`/factory/${factory.id}`}>
                            View Factory
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
