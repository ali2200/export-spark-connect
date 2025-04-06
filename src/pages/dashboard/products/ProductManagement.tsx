
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Search, Edit, Trash, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ProductFormDialog } from "@/components/dashboard/products/ProductFormDialog";
import { useToast } from "@/hooks/use-toast";

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Premium Wooden Dining Table",
    category: "Furniture",
    price: 450,
    status: "active",
    targetMarkets: ["Gulf", "Europe"],
    marketers: 3,
    leads: 8,
    createdAt: "2024-03-15",
    image: "https://via.placeholder.com/100x100",
  },
  {
    id: "2",
    name: "Handcrafted Leather Sofa",
    category: "Furniture",
    price: 1200,
    status: "active",
    targetMarkets: ["Europe", "USA"],
    marketers: 5,
    leads: 12,
    createdAt: "2024-03-10",
    image: "https://via.placeholder.com/100x100",
  },
  {
    id: "3",
    name: "Modern Glass Coffee Table",
    category: "Furniture",
    price: 320,
    status: "pending",
    targetMarkets: ["Gulf", "Africa"],
    marketers: 0,
    leads: 0,
    createdAt: "2024-04-01",
    image: "https://via.placeholder.com/100x100",
  },
  {
    id: "4",
    name: "Organic Cotton Bedsheets",
    category: "Textiles",
    price: 85,
    status: "active",
    targetMarkets: ["Europe", "USA"],
    marketers: 4,
    leads: 6,
    createdAt: "2024-03-05",
    image: "https://via.placeholder.com/100x100",
  },
  {
    id: "5",
    name: "Ceramic Dining Set",
    category: "Home Goods",
    price: 120,
    status: "inactive",
    targetMarkets: ["Africa", "Asia"],
    marketers: 2,
    leads: 3,
    createdAt: "2024-02-20",
    image: "https://via.placeholder.com/100x100",
  }
];

export default function ProductManagement() {
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { toast } = useToast();

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (product: any) => {
    toast({
      title: "Product deleted",
      description: `${product.name} has been deleted.`,
    });
  };

  const handleFormSubmit = (data: any) => {
    toast({
      title: selectedProduct ? "Product updated" : "Product created",
      description: `${data.name} has been ${selectedProduct ? "updated" : "created"}.`,
    });
    setIsFormOpen(false);
  };

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-gray-400">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
              startIcon={<Search className="h-4 w-4" />}
            />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Target Markets</TableHead>
                      <TableHead>Marketers</TableHead>
                      <TableHead>Leads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          No products found. Add your first product to start exporting!
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                              <span>{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>{getStatusBadge(product.status)}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {product.targetMarkets.map((market) => (
                                <Badge key={market} variant="outline">
                                  {market}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{product.marketers}</TableCell>
                          <TableCell>{product.leads}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteProduct(product)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Target Markets</TableHead>
                      <TableHead>Marketers</TableHead>
                      <TableHead>Leads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts
                      .filter((product) => product.status === "active")
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                              <span>{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {product.targetMarkets.map((market) => (
                                <Badge key={market} variant="outline">
                                  {market}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{product.marketers}</TableCell>
                          <TableCell>{product.leads}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Target Markets</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts
                      .filter((product) => product.status === "pending")
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                              <span>{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {product.targetMarkets.map((market) => (
                                <Badge key={market} variant="outline">
                                  {market}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Target Markets</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts
                      .filter((product) => product.status === "inactive")
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                              <span>{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {product.targetMarkets.map((market) => (
                                <Badge key={market} variant="outline">
                                  {market}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProductFormDialog 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
