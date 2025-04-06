
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building, Factory, MapPin, Phone, Mail, Globe, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useIsMobile } from "@/hooks/use-mobile";

// Industries data
const industries = [
  {
    id: "furniture",
    name: "Furniture Industry",
    description: "Egyptian furniture manufacturers with high-quality craftsmanship and unique designs.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=600&q=80",
    companies: [
      {
        id: "al-mahmoud",
        name: "Al-Mahmoud Furniture",
        location: "Cairo, Egypt",
        description: "Premium furniture manufacturer specializing in handcrafted wooden pieces.",
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=600&q=80",
        productsCount: 24,
        contactInfo: {
          phone: "+20 2 12345678",
          email: "info@almahmoudfurniture.com",
          website: "www.almahmoudfurniture.com",
          address: "Industrial Zone, Cairo, Egypt"
        }
      },
      {
        id: "cairo-comfort",
        name: "Cairo Comfort",
        location: "Alexandria, Egypt",
        description: "Luxury furniture for homes and hotels with modern designs.",
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=600&q=80",
        productsCount: 18,
        contactInfo: {
          phone: "+20 3 12345678",
          email: "info@cairocomfort.com",
          website: "www.cairocomfort.com",
          address: "Alexandria Industrial Zone, Alexandria, Egypt"
        }
      }
    ]
  },
  {
    id: "textiles",
    name: "Textiles Industry",
    description: "Egyptian textile manufacturers known for high-quality cotton and fabrics.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80",
    companies: [
      {
        id: "alexandria-textiles",
        name: "Alexandria Textiles",
        location: "Alexandria, Egypt",
        description: "Premium textile manufacturer specializing in Egyptian cotton.",
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80",
        productsCount: 36,
        contactInfo: {
          phone: "+20 3 87654321",
          email: "info@alexandriatextiles.com",
          website: "www.alexandriatextiles.com",
          address: "Textile Zone, Alexandria, Egypt"
        }
      }
    ]
  }
];

export default function IndustryPage() {
  const { industryId } = useParams<{ industryId: string }>();
  const [industry, setIndustry] = useState<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Find the industry by ID
    const foundIndustry = industries.find((ind) => ind.id === industryId);
    setIndustry(foundIndustry);
  }, [industryId]);

  if (!industry) {
    return (
      <div className="container py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Industry Not Found</h2>
          <p className="mb-6">The industry you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/factories">Back to Directory</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 md:py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/factories">Factory Directory</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{industry.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <Button variant="outline" size={isMobile ? "sm" : "default"} asChild className="mb-4">
          <Link to="/factories">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">{industry.name}</h1>
        <p className="text-muted-foreground mb-6">{industry.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Companies in this Industry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industry.companies.map((company: any) => (
            <Card key={company.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={company.image}
                  alt={company.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{company.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {company.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm line-clamp-2">{company.description}</p>
                <div className="mt-3 flex items-center">
                  <Badge variant="outline">
                    {company.productsCount} Products
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/factory/${company.id}`}>
                    View Profile <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">About {industry.name} in Egypt</h3>
        <p className="mb-4">
          Egyptian {industry.id} manufacturers are renowned for their quality craftsmanship and competitive pricing.
          With decades of experience and a rich cultural heritage, these companies combine traditional techniques
          with modern manufacturing to create exceptional products for global markets.
        </p>
        <p>
          Export Spark connects these manufacturers with international marketers to expand their global reach
          and bring Egyptian quality to markets worldwide.
        </p>
      </div>
    </div>
  );
}
