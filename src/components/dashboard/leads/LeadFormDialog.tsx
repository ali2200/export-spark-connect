
import { useState } from "react";
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

// Form schema
const leadFormSchema = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please provide a valid email address.",
  }),
  contactPhone: z.string().min(7, {
    message: "Please provide a valid phone number.",
  }),
  productId: z.string({
    required_error: "Please select a product.",
  }),
  quantity: z.coerce.number().int().positive({
    message: "Quantity must be a positive number.",
  }),
  clientNotes: z.string().optional(),
  verifiedLead: z.boolean().default(false),
});

// Mock products data the marketer is authorized to market
const myProducts = [
  {
    id: "1",
    name: "Premium Wooden Dining Table",
    factory: "Al-Mahmoud Furniture",
    commission: 45,
  },
  {
    id: "2",
    name: "Handcrafted Leather Sofa",
    factory: "Cairo Comfort",
    commission: 120,
  },
  {
    id: "4",
    name: "Organic Cotton Bedsheets",
    factory: "Alexandria Textiles",
    commission: 15,
  },
  {
    id: "6",
    name: "Olive Wood Cutting Board",
    factory: "Natural Crafts",
    commission: 9,
  },
];

// Country list
const countries = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Kuwait",
  "Qatar",
  "Bahrain",
  "Oman",
  "Germany",
  "United Kingdom",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "United States",
  "Canada",
  "Kenya",
  "Nigeria",
  "South Africa",
  "Morocco",
  "Other",
];

interface LeadFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function LeadFormDialog({
  isOpen,
  onClose,
  onSubmit,
}: LeadFormDialogProps) {
  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      clientName: "",
      country: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      productId: "",
      quantity: 1,
      clientNotes: "",
      verifiedLead: false,
    },
  });

  // Get selected product details
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const selectedProduct = myProducts.find(p => p.id === selectedProductId);

  // Handle product selection
  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
  };

  // Submit handler
  const handleSubmit = (values: z.infer<typeof leadFormSchema>) => {
    // Get product details to include in submission
    const selectedProduct = myProducts.find(p => p.id === values.productId);
    
    // Combine form data with product details
    const leadData = {
      ...values,
      productName: selectedProduct?.name || "",
      factoryName: selectedProduct?.factory || "",
      commissionValue: selectedProduct?.commission || 0,
      status: "new",
      date: new Date().toISOString().split('T')[0],
    };
    
    onSubmit(leadData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit New Lead</DialogTitle>
          <DialogDescription>
            Provide details about a potential client interested in one of your products.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dubai Luxury Hotels" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Ahmed Al-Jabri" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="contact@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+971 55 123 4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Product Information</h3>
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleProductChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {myProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} ({product.factory})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedProduct && (
                <div className="bg-green-50 p-3 rounded-md mt-2 text-sm">
                  <div className="font-medium text-green-800">
                    Commission: ${selectedProduct.commission}
                  </div>
                  <div className="text-green-700">
                    Factory: {selectedProduct.factory}
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interested Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Estimated quantity the client is interested in
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about the client's request..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include specific requirements, deadline information, or other relevant details
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="verifiedLead"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Verified Lead</FormLabel>
                      <FormDescription>
                        I confirm that this is a legitimate lead and I have directly communicated with this client.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit Lead</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
