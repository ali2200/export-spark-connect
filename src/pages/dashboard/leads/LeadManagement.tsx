
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { LeadDetailDialog } from "@/components/dashboard/leads/LeadDetailDialog";
import { LeadFormDialog } from "@/components/dashboard/leads/LeadFormDialog";

// Mock leads data
const mockLeads = [
  {
    id: "1",
    clientName: "Dubai Luxury Hotels",
    country: "United Arab Emirates",
    product: "Premium Wooden Dining Table",
    status: "new",
    date: "2024-04-01",
    quantity: 20,
    value: 9000,
    marketerName: "Ahmed Hassan",
    productId: "1",
    factoryName: "Al-Mahmoud Furniture",
  },
  {
    id: "2",
    clientName: "European Furniture Imports",
    country: "Germany",
    product: "Handcrafted Leather Sofa",
    status: "contacted",
    date: "2024-03-28",
    quantity: 10,
    value: 12000,
    marketerName: "Sara Ahmed",
    productId: "2",
    factoryName: "Cairo Comfort",
  },
  {
    id: "3",
    clientName: "Riyadh Home Furnishing",
    country: "Saudi Arabia",
    product: "Modern Glass Coffee Table",
    status: "negotiating",
    date: "2024-03-25",
    quantity: 15,
    value: 4800,
    marketerName: "Mohammed Salah",
    productId: "3",
    factoryName: "Glass Masters Egypt",
  },
  {
    id: "4",
    clientName: "London Luxury Homes",
    country: "United Kingdom",
    product: "Organic Cotton Bedsheets",
    status: "sample_requested",
    date: "2024-03-20",
    quantity: 100,
    value: 8500,
    marketerName: "Ahmed Hassan",
    productId: "4",
    factoryName: "Alexandria Textiles",
  },
  {
    id: "5",
    clientName: "Nairobi Hotels Group",
    country: "Kenya",
    product: "Ceramic Dining Set",
    status: "closed",
    date: "2024-03-15",
    quantity: 50,
    value: 6000,
    marketerName: "Laila Omar",
    productId: "5",
    factoryName: "Nile Ceramics",
  },
  {
    id: "6",
    clientName: "Scandinavian Design Co.",
    country: "Sweden",
    product: "Handcrafted Leather Sofa",
    status: "lost",
    date: "2024-03-10",
    quantity: 5,
    value: 6000,
    marketerName: "Sara Ahmed",
    productId: "2",
    factoryName: "Cairo Comfort",
  },
];

export default function LeadManagement() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter leads based on user role and search query
  const filteredLeads = mockLeads.filter((lead) => {
    // For factory users, show only leads for their products
    if (user?.role === "factory") {
      // In a real app, we'd check if the factory owns the product
      // For now, we'll just assume all leads are for this factory
    }
    
    // For marketers, show only leads they've submitted
    if (user?.role === "marketer") {
      // In a real app, we'd check if the lead was submitted by this marketer
      // For now, we'll just filter by the marketer's name matching the user's name
      if (lead.marketerName !== user.name) {
        return false;
      }
    }
    
    // Apply search filtering
    return (
      lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.product.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle view lead details
  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setIsDetailDialogOpen(true);
  };

  // Handle create new lead
  const handleCreateLead = () => {
    setSelectedLead(null);
    setIsFormDialogOpen(true);
  };

  // Handle lead submission
  const handleLeadSubmit = (data: any) => {
    toast({
      title: "Lead submitted",
      description: `Lead for ${data.clientName} has been submitted successfully.`,
    });
    setIsFormDialogOpen(false);
  };

  // Get status badge for lead
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>;
      case "contacted":
        return <Badge className="bg-purple-500">Contacted</Badge>;
      case "negotiating":
        return <Badge className="bg-yellow-500">Negotiating</Badge>;
      case "sample_requested":
        return <Badge className="bg-orange-500">Sample Requested</Badge>;
      case "closed":
        return <Badge className="bg-green-500">Closed</Badge>;
      case "lost":
        return <Badge className="bg-red-500">Lost</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {user?.role === "factory" ? "Customer Leads" : "My Leads"}
        </h2>
        {user?.role === "marketer" && (
          <Button onClick={handleCreateLead}>
            <Plus className="mr-2 h-4 w-4" />
            Submit New Lead
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Leads</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadTable 
                leads={filteredLeads} 
                getStatusBadge={getStatusBadge} 
                onViewLead={handleViewLead}
                userRole={user?.role || "marketer"}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardContent className="pt-6">
              <LeadTable 
                leads={filteredLeads.filter(lead => lead.status === "new")} 
                getStatusBadge={getStatusBadge} 
                onViewLead={handleViewLead}
                userRole={user?.role || "marketer"}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardContent className="pt-6">
              <LeadTable 
                leads={filteredLeads.filter(lead => 
                  ["contacted", "negotiating", "sample_requested"].includes(lead.status)
                )} 
                getStatusBadge={getStatusBadge} 
                onViewLead={handleViewLead}
                userRole={user?.role || "marketer"}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closed">
          <Card>
            <CardContent className="pt-6">
              <LeadTable 
                leads={filteredLeads.filter(lead => 
                  ["closed", "lost"].includes(lead.status)
                )} 
                getStatusBadge={getStatusBadge} 
                onViewLead={handleViewLead}
                userRole={user?.role || "marketer"}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <LeadDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        lead={selectedLead}
        userRole={user?.role || "marketer"}
      />

      <LeadFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        onSubmit={handleLeadSubmit}
      />
    </div>
  );
}

interface LeadTableProps {
  leads: any[];
  getStatusBadge: (status: string) => React.ReactNode;
  onViewLead: (lead: any) => void;
  userRole: string;
}

function LeadTable({ leads, getStatusBadge, onViewLead, userRole }: LeadTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            {userRole === "factory" && <TableHead>Marketer</TableHead>}
            <TableHead>Value (USD)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={userRole === "factory" ? 8 : 7} className="text-center py-8">
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.clientName}</TableCell>
                <TableCell>{lead.country}</TableCell>
                <TableCell>{lead.product}</TableCell>
                <TableCell>{getStatusBadge(lead.status)}</TableCell>
                <TableCell>{lead.date}</TableCell>
                {userRole === "factory" && <TableCell>{lead.marketerName}</TableCell>}
                <TableCell>${lead.value.toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => onViewLead(lead)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
