
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Search, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "active" | "inactive" | "draft";
  targetMarkets: string[];
  marketers: number;
  leads: number;
  createdAt: string;
  image: string;
  factoryName: string;
  description: string;
  commission: number;
}

interface ProductListProps {
  products: Product[];
  onApply?: (product: Product) => void;
  onViewDetails?: (productId: string) => void;
}

export const ProductList = ({ products, onApply, onViewDetails }: ProductListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleViewProductPage = (productId: string) => {
    if (onViewDetails) {
      onViewDetails(productId);
    } else {
      navigate(`/dashboard/products/${productId}`);
    }
  };

  const handleApplyToMarket = (product: Product) => {
    if (onApply) {
      onApply(product);
    } else {
      toast({
        title: "Application sent",
        description: `You've applied to market ${product.name}.`,
      });
    }
  };

  return (
    <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
      {products.map((product) => (
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
                size={isMobile ? "sm" : "default"}
                onClick={() => handleViewProductPage(product.id)}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Button>
              <Button
                variant="default"
                size={isMobile ? "sm" : "default"}
                onClick={() => handleApplyToMarket(product)}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-1" />
                Apply
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
