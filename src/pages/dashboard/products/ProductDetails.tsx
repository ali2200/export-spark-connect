
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Users, 
  ShoppingBag, 
  Globe, 
  LineChart, 
  Building,
  Mail,
  Calendar
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";

// Mock products data - we would normally fetch this from an API
const mockProducts = [
  {
    id: "1",
    name: "Premium Wooden Dining Table",
    category: "Furniture",
    price: 450,
    status: "active",
    targetMarkets: ["gulf", "europe"],
    marketers: 3,
    leads: 8,
    createdAt: "2024-03-15",
    image: "https://via.placeholder.com/300x200",
    factoryName: "Al-Mahmoud Furniture",
    description: "Elegant wooden dining table made from premium oak. Perfect for luxury homes and hotels.",
    commission: 45,
    materials: ["Premium Oak", "Stainless Steel"],
    dimensions: "180cm x 90cm x 75cm",
    minOrderQuantity: 10,
    leadTime: "4-6 weeks",
    certification: ["ISO 9001", "FSC Certified"],
    warranty: "3 years",
    packaging: "Export-grade carton box with foam protection",
    factoryId: "f-001",
    factoryLocation: "Cairo, Egypt",
    factoryContactEmail: "info@almahmoud.com",
    marketingMaterials: [
      { type: "image", url: "https://via.placeholder.com/800x600", title: "Product Front View" },
      { type: "image", url: "https://via.placeholder.com/800x600", title: "Product Side View" },
      { type: "pdf", url: "#", title: "Product Specification Sheet" },
    ],
    marketingTips: "This premium dining table appeals to luxury hotels and high-end residential projects. Highlight the craftsmanship and premium materials in your marketing."
  },
  {
    id: "2",
    name: "Handcrafted Leather Sofa",
    category: "Furniture",
    price: 1200,
    status: "active",
    targetMarkets: ["europe", "usa"],
    marketers: 5,
    leads: 12,
    createdAt: "2024-03-10",
    image: "https://via.placeholder.com/300x200",
    factoryName: "Cairo Comfort",
    description: "Premium leather sofa handcrafted by skilled artisans. Durable and elegant design for luxury living rooms.",
    commission: 120,
    materials: ["Genuine Leather", "Hardwood Frame"],
    dimensions: "220cm x 85cm x 90cm",
    minOrderQuantity: 5,
    leadTime: "6-8 weeks",
    certification: ["ISO 9001", "REACH Compliant"],
    warranty: "5 years",
    packaging: "Wooden crate with protective wrapping",
    factoryId: "f-002",
    factoryLocation: "Alexandria, Egypt",
    factoryContactEmail: "sales@cairocomfort.com",
    marketingMaterials: [
      { type: "image", url: "https://via.placeholder.com/800x600", title: "Sofa Front View" },
      { type: "image", url: "https://via.placeholder.com/800x600", title: "Sofa Fabric Detail" },
      { type: "pdf", url: "#", title: "Product Catalog" },
    ],
    marketingTips: "Emphasize the handcrafted nature and premium leather quality. Target high-end furniture retailers in Europe and North America."
  }
];

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data based on ID
  useEffect(() => {
    setLoading(true);
    // In a real app, we would fetch the product from an API
    // For now, we'll simulate a fetch with the mock data
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }, 500);
  }, [productId]);

  // Handle apply to market
  const handleApplyToMarket = () => {
    if (!product) return;
    
    toast({
      title: "Application sent",
      description: `You've applied to market ${product.name}.`,
    });
  };

  // Handle navigation back to products page
  const handleGoBack = () => {
    navigate("/dashboard/products");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={handleGoBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge>{product.category}</Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              ${product.commission} commission
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {user?.role === "marketer" && (
            <Button onClick={handleApplyToMarket}>Apply to Market</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product main info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md mb-4">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-semibold text-lg">Description</h3>
                <p className="text-muted-foreground mt-1">{product.description}</p>
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold text-lg">Product Details</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">${product.price}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Materials:</span>
                      <span className="font-medium">{product.materials.join(", ")}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span className="font-medium">{product.dimensions}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Min. Order:</span>
                      <span className="font-medium">{product.minOrderQuantity} units</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Lead Time:</span>
                      <span className="font-medium">{product.leadTime}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Warranty:</span>
                      <span className="font-medium">{product.warranty}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Certifications</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.certification.map((cert: string) => (
                      <Badge key={cert} variant="secondary">{cert}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Target Markets</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.targetMarkets.map((market: string) => (
                      <div key={market} className="flex items-center gap-1">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">{market}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manufacturer details */}
        <Card>
          <CardHeader>
            <CardTitle>Manufacturer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">
                <Building className="h-4 w-4 inline mr-2" />
                {product.factoryName}
              </h3>
              <p className="text-muted-foreground mt-1">{product.factoryLocation}</p>
              <div className="mt-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${product.factoryContactEmail}`} className="text-blue-500 hover:underline">
                  {product.factoryContactEmail}
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Product Stats</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-muted-foreground">Marketers</div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-lg font-medium">{product.marketers}</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Leads</div>
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    <span className="text-lg font-medium">{product.leads}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Added</h3>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {user?.role === "marketer" && (
              <div className="pt-4">
                <Button className="w-full" onClick={handleApplyToMarket}>
                  Apply to Market
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs section for additional information */}
      <Tabs defaultValue="marketing" className="w-full">
        <TabsList>
          <TabsTrigger value="marketing">Marketing Materials</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          {user?.role === "factory" && <TabsTrigger value="marketers">Marketers</TabsTrigger>}
        </TabsList>

        <TabsContent value="marketing" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Marketing Tips</h3>
                <p className="text-muted-foreground">{product.marketingTips}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Assets & Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.marketingMaterials.map((material: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        {material.type === "image" ? (
                          <div className="aspect-[3/2] w-full overflow-hidden rounded-md">
                            <img 
                              src={material.url}
                              alt={material.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[3/2] w-full bg-slate-100 flex items-center justify-center rounded-md">
                            <div className="text-center">
                              <span className="uppercase text-sm font-medium text-slate-500">
                                {material.type.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="mt-2">
                          <h4 className="font-medium">{material.title}</h4>
                          <div className="mt-1 flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                              <a href={material.url} target="_blank" rel="noopener noreferrer">Download</a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Lead Conversion</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Conversion Rate</span>
                      <span className="font-medium">36%</span>
                    </div>
                    <Progress value={36} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Above average compared to similar products in this category.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Market Performance</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Market</TableHead>
                        <TableHead>Leads</TableHead>
                        <TableHead>Conversion</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Gulf Countries</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>43%</TableCell>
                        <TableCell className="text-right">$3,240</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Europe</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>25%</TableCell>
                        <TableCell className="text-right">$1,800</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>USA</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>33%</TableCell>
                        <TableCell className="text-right">$1,350</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user?.role === "factory" && (
          <TabsContent value="marketers" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Marketers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Leads</TableHead>
                      <TableHead>Deals Closed</TableHead>
                      <TableHead className="text-right">Commission Paid</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Ahmed Hassan</TableCell>
                      <TableCell>UAE</TableCell>
                      <TableCell>Mar 15, 2024</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell className="text-right">$135</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sara Ahmed</TableCell>
                      <TableCell>Germany</TableCell>
                      <TableCell>Mar 10, 2024</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell className="text-right">$90</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mohammed Salah</TableCell>
                      <TableCell>Saudi Arabia</TableCell>
                      <TableCell>Apr 1, 2024</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell className="text-right">$0</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
