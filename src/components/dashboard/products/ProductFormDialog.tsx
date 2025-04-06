
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, XCircle } from "lucide-react";

// Form schema
const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  minOrderQuantity: z.coerce.number().int().positive().optional(),
  status: z.string().default("pending"),
  targetMarkets: z.array(z.string()).min(1, {
    message: "Please select at least one target market.",
  }),
});

// Market regions options
const marketRegions = [
  { id: "gulf", label: "Gulf Countries" },
  { id: "europe", label: "Europe" },
  { id: "usa", label: "USA & Canada" },
  { id: "africa", label: "Africa" },
  { id: "asia", label: "Asia" },
  { id: "other", label: "Other Regions" },
];

// Product categories
const productCategories = [
  "Furniture",
  "Textiles",
  "Food & Beverages",
  "Home Goods",
  "Construction Materials",
  "Handicrafts",
  "Electronics",
  "Chemicals",
  "Agricultural Products",
  "Other",
];

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  onSubmit: (data: any) => void;
}

export function ProductFormDialog({
  isOpen,
  onClose,
  product,
  onSubmit,
}: ProductFormDialogProps) {
  const [images, setImages] = useState<Array<string | File>>([]);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
      minOrderQuantity: 1,
      status: "pending",
      targetMarkets: [],
    },
  });

  // Set form values when editing a product
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price || 0,
        minOrderQuantity: product.minOrderQuantity || 1,
        status: product.status || "pending",
        targetMarkets: product.targetMarkets || [],
      });
      setImages(product.images ? [...product.images] : []);
    } else {
      form.reset({
        name: "",
        category: "",
        description: "",
        price: 0,
        minOrderQuantity: 1,
        status: "pending",
        targetMarkets: [],
      });
      setImages([]);
    }
  }, [product, form]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = [...images];
      for (let i = 0; i < e.target.files.length; i++) {
        newImages.push(e.target.files[i]);
      }
      setImages(newImages);
    }
  };

  // Remove image at index
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Submit handler
  const handleSubmit = (values: z.infer<typeof productFormSchema>) => {
    // Combine form data with images
    const formData = {
      ...values,
      images,
    };
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Update your product information below."
              : "Enter the details of your product to make it available for export."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Premium Wooden Dining Table" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a descriptive name for your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your product in detail..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include materials, dimensions, features, and other important details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Base export price per unit (USD).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minOrderQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {field.value === "pending" && "Your product will be reviewed before becoming active."}
                    {field.value === "active" && "Your product will be visible to marketers."}
                    {field.value === "inactive" && "Your product won't be visible to marketers."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetMarkets"
              render={() => (
                <FormItem>
                  <FormLabel>Target Markets</FormLabel>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {marketRegions.map((region) => (
                      <FormField
                        key={region.id}
                        control={form.control}
                        name="targetMarkets"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={region.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(region.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          region.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== region.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {region.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormDescription>
                    Select regions where you want to export this product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Product Images</FormLabel>
              <div className="mt-2 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-md overflow-hidden border bg-muted"
                    >
                      <img
                        src={
                          typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)
                        }
                        alt={`Product image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted cursor-pointer hover:border-muted-foreground/50 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground/50" />
                    <span className="text-xs text-muted-foreground mt-2">
                      Upload Image
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <FormDescription>
                  Upload high-quality images of your product. You can upload
                  multiple images.
                </FormDescription>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {product ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
