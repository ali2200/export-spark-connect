
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Phone, Mail, Globe, File, Download, PlayCircle, CheckCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Mock factory data
const mockFactories = [
  {
    id: "cairo-crafts",
    name: "Cairo Crafts Ltd.",
    logo: "https://via.placeholder.com/150",
    coverImage: "https://via.placeholder.com/1200x300",
    description: "Cairo Crafts is a leading manufacturer of handcrafted furniture and home goods, specializing in traditional Egyptian designs with modern functionality.",
    established: "2010",
    location: "Cairo, Egypt",
    employees: "50-100",
    phone: "+20 2 1234 5678",
    email: "info@cairocrafts.com",
    website: "www.cairocrafts.com",
    certifications: ["ISO 9001:2015", "FSC Certified", "Export Ready"],
    productCategories: ["Furniture", "Home Goods", "Handicrafts"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    gallery: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
    ],
    products: [
      {
        id: "1",
        name: "Premium Wooden Dining Table",
        category: "Furniture",
        price: "$450",
        image: "https://via.placeholder.com/300x200",
      },
      {
        id: "2",
        name: "Handcrafted Leather Sofa",
        category: "Furniture",
        price: "$1,200",
        image: "https://via.placeholder.com/300x200",
      },
      {
        id: "3",
        name: "Modern Glass Coffee Table",
        category: "Furniture",
        price: "$320",
        image: "https://via.placeholder.com/300x200",
      },
      {
        id: "4",
        name: "Olive Wood Cutting Board",
        category: "Home Goods",
        price: "$45",
        image: "https://via.placeholder.com/300x200",
      },
    ]
  },
  {
    id: "alexandria-textiles",
    name: "Alexandria Textiles",
    logo: "https://via.placeholder.com/150",
    coverImage: "https://via.placeholder.com/1200x300",
    description: "Alexandria Textiles produces premium Egyptian cotton products with a focus on sustainability and ethical manufacturing practices.",
    established: "1995",
    location: "Alexandria, Egypt",
    employees: "100-250",
    phone: "+20 3 4567 8901",
    email: "info@alexandriatextiles.com",
    website: "www.alexandriatextiles.com",
    certifications: ["ISO 9001:2015", "GOTS Certified", "Fair Trade"],
    productCategories: ["Textiles", "Home Textiles", "Apparel"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    gallery: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
    ],
    products: [
      {
        id: "1",
        name: "Organic Cotton Bedsheets",
        category: "Home Textiles",
        price: "$85",
        image: "https://via.placeholder.com/300x200",
      },
      {
        id: "2",
        name: "Premium Cotton Towel Set",
        category: "Home Textiles",
        price: "$65",
        image: "https://via.placeholder.com/300x200",
      },
      {
        id: "3",
        name: "Handwoven Cotton Scarves",
        category: "Apparel",
        price: "$30",
        image: "https://via.placeholder.com/300x200",
      }
    ]
  }
];

export default function FactoryMicrosite() {
  const { factoryId } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Find the factory by id
  const factory = mockFactories.find(f => f.id === factoryId);

  // If factory is not found
  if (!factory) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Factory Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The factory you're looking for doesn't exist or may have been removed.
        </p>
        <Button asChild>
          <a href="/factories">Browse All Factories</a>
        </Button>
      </div>
    );
  }

  const openImageModal = (image: string) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-muted">
        <img
          src={factory.coverImage}
          alt={`${factory.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="container flex items-end gap-6">
            <div className="bg-white p-1 rounded-lg shadow-lg">
              <img
                src={factory.logo}
                alt={factory.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-1">{factory.name}</h1>
              <div className="flex flex-wrap gap-2">
                {factory.productCategories.map((category, index) => (
                  <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/40">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-background">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">About {factory.name}</h2>
                      <p className="text-muted-foreground">{factory.description}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Established</p>
                          <p className="font-medium">{factory.established}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">{factory.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{factory.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{factory.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Website</p>
                          <p className="font-medium">{factory.website}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-muted-foreground">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <div>
                          <p className="text-sm text-muted-foreground">Employees</p>
                          <p className="font-medium">{factory.employees}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold mb-2">Factory Video</h2>
                    <div className="aspect-video w-full">
                      <iframe 
                        src={factory.videoUrl}
                        className="w-full h-full rounded-md"
                        allowFullScreen
                        title={`${factory.name} video`}
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {factory.products.slice(0, 4).map(product => (
                        <div key={product.id} className="border rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-3">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium">{product.name}</h3>
                              <Badge variant="outline">{product.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Price from: {product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full" asChild>
                        <a href="#products">View All Products</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Download Materials</h3>
                    <ul className="space-y-3">
                      <li>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="#" download>
                            <File className="h-4 w-4 mr-2" />
                            Company Profile (PDF)
                            <Download className="h-4 w-4 ml-auto" />
                          </a>
                        </Button>
                      </li>
                      <li>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="#" download>
                            <File className="h-4 w-4 mr-2" />
                            Product Catalog (PDF)
                            <Download className="h-4 w-4 ml-auto" />
                          </a>
                        </Button>
                      </li>
                      <li>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="#" download>
                            <File className="h-4 w-4 mr-2" />
                            Export Documentation
                            <Download className="h-4 w-4 ml-auto" />
                          </a>
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Certifications</h3>
                    <div className="space-y-2">
                      {factory.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Contact Factory</h3>
                    <Button className="w-full">Request Information</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">All Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {factory.products.map(product => (
                    <div key={product.id} className="border rounded-md overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{product.name}</h3>
                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Price from: {product.price}</p>
                        <Button size="sm" variant="outline" className="w-full">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Factory Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {factory.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="rounded-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                      onClick={() => openImageModal(image)}
                    >
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Certificates & Documentation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Factory Certifications</h3>
                    <div className="space-y-4">
                      {factory.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start p-4 border rounded-md">
                          <div className="p-2 bg-primary/10 rounded mr-3">
                            <File className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{cert}</h4>
                            <p className="text-sm text-muted-foreground">Valid until: Dec 2025</p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Export Documentation</h3>
                    <div className="space-y-4">
                      <div className="flex items-start p-4 border rounded-md">
                        <div className="p-2 bg-primary/10 rounded mr-3">
                          <File className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Export License</h4>
                          <p className="text-sm text-muted-foreground">License ID: EXP-12345</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-start p-4 border rounded-md">
                        <div className="p-2 bg-primary/10 rounded mr-3">
                          <File className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Quality Standards</h4>
                          <p className="text-sm text-muted-foreground">International compliance</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-start p-4 border rounded-md">
                        <div className="p-2 bg-primary/10 rounded mr-3">
                          <File className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Export Pricing Guide</h4>
                          <p className="text-sm text-muted-foreground">Pricing structure for buyers</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery preview"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
