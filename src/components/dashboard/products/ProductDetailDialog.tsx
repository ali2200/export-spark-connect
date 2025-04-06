
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, PackageCheck, Globe, DollarSign, ShoppingCart, Factory, BarChart3, Truck, Landmark } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ProductDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onApply: (product: any) => void;
}

export function ProductDetailDialog({
  isOpen,
  onClose,
  product,
  onApply,
}: ProductDetailDialogProps) {
  if (!product) return null;

  // Map target markets to user-friendly names
  const marketNames: Record<string, string> = {
    gulf: "Gulf Countries",
    europe: "Europe",
    usa: "USA & Canada",
    africa: "Africa",
    asia: "Asia",
    other: "Other Regions",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            <Building2 className="h-4 w-4 opacity-70" />
            By {product.factoryName}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Info</TabsTrigger>
            <TabsTrigger value="factory">Factory Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.targetMarkets.map((market: string) => (
                <Badge key={market} variant="secondary">
                  {marketNames[market] || market}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                    ${product.price} USD
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Minimum Order
                  </div>
                  <div className="font-medium flex items-center">
                    <PackageCheck className="h-4 w-4 mr-1 text-blue-600" />
                    {product.minOrderQuantity || 1} units
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Marketers Working
                  </div>
                  <div className="font-medium flex items-center">
                    <BarChart3 className="h-4 w-4 mr-1 text-purple-600" />
                    {product.marketers} marketers
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Leads Generated
                  </div>
                  <div className="font-medium flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-1 text-orange-600" />
                    {product.leads} leads
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="marketing" className="space-y-4">
            <div className="p-4 border rounded-md bg-green-50">
              <h3 className="text-lg font-medium text-green-800 mb-1">
                Commission Details
              </h3>
              <div className="flex items-center text-green-800">
                <DollarSign className="h-5 w-5 mr-1" />
                <span className="text-2xl font-bold">${product.commission}</span>
                <span className="ml-2">per successful lead</span>
              </div>
              <p className="text-sm text-green-700 mt-2">
                You'll earn this commission for every qualified lead that results in a sample request or sales inquiry.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Target Markets</h3>
              <div className="space-y-1">
                {product.targetMarkets.map((market: string) => (
                  <div key={market} className="flex items-center gap-2 p-2 border rounded-md">
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span>{marketNames[market] || market}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Marketing Assets</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Product Brochure
                </Button>
                <Button variant="outline" className="justify-start">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="14" rx="2" ry="2" width="20" x="2" y="3" />
                    <line x1="8" x2="16" y1="21" y2="21" />
                    <line x1="12" x2="12" y1="17" y2="21" />
                  </svg>
                  Presentation
                </Button>
                <Button variant="outline" className="justify-start">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="12" rx="2" width="16" x="4" y="4" />
                    <line x1="4" x2="20" y1="10" y2="10" />
                    <line x1="10" x2="10" y1="4" y2="16" />
                  </svg>
                  Image Gallery
                </Button>
                <Button variant="outline" className="justify-start">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m10 7 5 3-5 3Z" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Product Video
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Selling Points</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-green-600 mt-0.5"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Premium quality materials and craftsmanship</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-green-600 mt-0.5"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Competitive pricing for wholesale buyers</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-green-600 mt-0.5"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Customization options available for bulk orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-green-600 mt-0.5"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Fast shipping and reliable delivery timelines</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="factory" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                <Factory className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{product.factoryName}</h3>
                <p className="text-sm text-muted-foreground">
                  Established manufacturer since 2010
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">Alexandria, Egypt</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Years in Business
                </div>
                <div className="font-medium">13 years</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Export Experience
                </div>
                <div className="font-medium">8+ years</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Product Categories
                </div>
                <div className="font-medium">{product.category}</div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex gap-1 items-center">
                  <Landmark className="h-3 w-3" />
                  ISO 9001
                </Badge>
                <Badge variant="outline" className="flex gap-1 items-center">
                  <Truck className="h-3 w-3" />
                  Export License
                </Badge>
                <Badge variant="outline" className="flex gap-1 items-center">
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 6H10m0 0a3 3 0 1 0-6 0m6 0a3 3 0 1 1-6 0m0 0H4m16 6h-2m0 0a3 3 0 1 0-6 0m6 0a3 3 0 1 1-6 0m-6 6h12" />
                  </svg>
                  GOTS Certified
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">About the Factory</h3>
              <p className="text-sm text-muted-foreground">
                {product.factoryName} is a leading manufacturer of {product.category.toLowerCase()} 
                products in Egypt. With state-of-the-art facilities and a team of skilled craftsmen, 
                we produce high-quality products for the local and international markets. 
                Our commitment to quality and innovation has made us a preferred supplier for 
                buyers across the globe.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Factory Highlights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600 mt-0.5"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m5 12 5 5 9-9" />
                  </svg>
                  <span>Modern production facilities with quality control systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600 mt-0.5"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m5 12 5 5 9-9" />
                  </svg>
                  <span>Experienced in international shipping and documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600 mt-0.5"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m5 12 5 5 9-9" />
                  </svg>
                  <span>Ethical manufacturing practices and fair labor conditions</span>
                </li>
              </ul>
            </div>

            <Button variant="outline" className="w-full">
              View Factory Profile
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
          <Button onClick={() => onApply(product)} className="w-full sm:w-auto">
            Apply to Market This Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
