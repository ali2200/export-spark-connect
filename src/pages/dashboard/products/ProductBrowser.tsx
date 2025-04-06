import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ProductDetailDialog } from "@/components/dashboard/products/ProductDetailDialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Mock products data
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
  },
  {
    id: "3",
    name: "Modern Glass Coffee Table",
    category: "Furniture",
    price: 320,
    status: "active",
    targetMarkets: ["gulf", "africa"],
    marketers: 2,
    leads: 3,
    createdAt: "2024-04-01",
    image: "https://via.placeholder.com/300x200",
    factoryName: "Glass Masters Egypt",
    description: "Contemporary glass coffee table with tempered glass and stainless steel frame. Elegant and durable.",
    commission: 32,
  },
  {
    id: "4",
    name: "Organic Cotton Bedsheets",
    category: "Textiles",
    price: 85,
    status: "active",
    targetMarkets: ["europe", "usa"],
    marketers: 4,
    leads: 6,
    createdAt: "2024-03-05",
    image: "https://via.placeholder.com/300x200",
    factoryName: "Alexandria Textiles",
    description: "100% Egyptian cotton bedsheets with high thread count. Soft, luxurious feel and excellent durability.",
    commission: 15,
  },
  {
    id: "5",
    name: "Ceramic Dining Set",
    category: "Home Goods",
    price: 120,
    status: "active",
    targetMarkets: ["africa", "asia"],
    marketers: 2,
    leads: 3,
    createdAt: "2024-02-20",
    image: "https://via.placeholder.com/300x200",
    factoryName: "Nile Ceramics",
    description: "Beautiful handcrafted ceramic dining set including plates, bowls, and cups. Traditional Egyptian designs.",
    commission: 18,
  },
  {
    id: "6",
    name: "Olive Wood Cutting Board",
    category: "Home Goods",
    price: 45,
    status: "active",
    targetMarkets: ["europe", "usa"],
    marketers: 3,
    leads: 7,
    createdAt: "2024-03-25",
    image: "https://via.placeholder.com/300x200",
    factoryName: "Natural Crafts",
    description: "Beautiful olive wood cutting boards with unique grain patterns. Each piece is one of a kind.",
    commission: 9,
  },
  {
    id: "7",
    name: "Hand-Knotted Wool Carpet",
    category: "Home Goods",
    price: 650,
    status: "active",
    targetMarkets: ["gulf", "europe", "usa"],
    marketers: 6,
    leads: 15,
    createdAt: "2024-01-10",
    image: "https://via.placeholder.com/300x200",
    factoryName: "Royal Carpets Egypt",
    description: "Traditional hand-knotted wool carpet with authentic Egyptian designs. Premium quality and craftsmanship.",
    commission: 78,
  },
  {
    id: "8",
    name: "Brass Wall Decor",
    category: "Home Goods",
    price: 89,
    status: "active",
    targetMarkets: ["gulf", "europe"],
    marketers: 4,
    leads: 9,
    createdAt: "2024-02-15",
    image: "https://via.placeholder.com/300x200",
    factoryName: "Cairo Metallics",
    description: "Handcrafted brass wall decorations with traditional Islamic patterns. Perfect for luxury homes and hotels.",
    commission: 17,
  }
];

// Categories
const productCategories = [
  "All Categories",
  "Furniture",
  "Textiles",
  "Home Goods",
  "Food & Beverages",
  "Construction Materials",
  "Handicrafts",
  "Electronics",
  "Chemicals",
  "Agricultural Products",
];

// Target markets
const targetMarkets = [
  "All Markets",
  "Gulf Countries",
  "Europe",
  "USA & Canada",
  "Africa",
  "Asia",
];

export default function ProductBrowser() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedMarket, setSelectedMarket] = useState("All Markets");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter products based on search, category, and market
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.factoryName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All Categories" || product.category === selectedCategory;
    
    const marketMap: Record<string, string[]> = {
      "Gulf Countries": ["gulf"],
      "Europe": ["europe"],
      "USA & Canada": ["usa"],
      "Africa": ["africa"],
      "Asia": ["asia"],
    };
    
    const marketFilter = marketMap[selectedMarket] || [];
    const matchesMarket = 
      selectedMarket === "All Markets" || 
      (marketFilter.length > 0 && marketFilter.some(m => product.targetMarkets.includes(m)));
    
    return matchesSearch && matchesCategory && matchesMarket;
  });

  // Handle view product details
  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsDetailDialogOpen(true);
  };

  // Handle view product details page
  const handleViewProductPage = (productId: string) => {
    navigate(`/dashboard/products/${productId}`);
  };

  // Handle apply to market
  const handleApplyToMarket = (product: any) => {
    toast({
      title: "Application sent",
      description: `You've applied to market ${product.name}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Browse Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Browse Products</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 lg:w-72 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Categories</h3>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <h3 className="font-medium">Target Market</h3>
                  <Select
                    value={selectedMarket}
                    onValueChange={setSelectedMarket}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetMarkets.map((market) => (
                        <SelectItem key={market} value={market}>
                          {market}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      className="w-1/2"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      className="w-1/2"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <h3 className="font-medium">Your Marketing Stats</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Products</span>
                    <span className="font-medium text-lg">5</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Active Campaigns</span>
                    <span className="font-medium text-lg">3</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Leads Generated</span>
                    <span className="font-medium text-lg">12</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Commissions</span>
                    <span className="font-medium text-lg">$230</span>
                  </div>
                </div>
                <Button variant="default" className="w-full">
                  View My Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Input
                placeholder="Search products or factories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-muted-foreground text-center mt-2 max-w-md">
                Try adjusting your search or filter criteria to find products to market.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div 
                    className="aspect-[3/2] w-full overflow-hidden cursor-pointer"
                    onClick={() => handleViewProductPage(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge>{product.category}</Badge>
                      <span className="font-medium text-green-600">
                        ${product.commission} commission
                      </span>
                    </div>
                    <h3 
                      className="font-semibold text-lg truncate cursor-pointer hover:text-blue-600"
                      onClick={() => handleViewProductPage(product.id)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      By {product.factoryName}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                      {product.description}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProductPage(product.id)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleApplyToMarket(product)}
                        className="flex-1"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        product={selectedProduct}
        onApply={handleApplyToMarket}
      />
    </div>
  );
}
