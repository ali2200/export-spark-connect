
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Megaphone,
  Plus,
  BarChart2,
  Users,
  Mail,
  Share2,
  Calendar,
  Globe,
  Briefcase,
  ArrowUpRight,
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

// Mock campaigns data
const mockCampaigns = [
  {
    id: "1",
    name: "Egyptian Furniture Export",
    status: "active",
    target: "Europe",
    leads: 12,
    budget: 1500,
    spent: 850,
    startDate: "2024-03-15",
    endDate: "2024-06-15",
    products: ["Premium Wooden Dining Table", "Handcrafted Leather Sofa"],
    performance: 87,
  },
  {
    id: "2",
    name: "Cotton Textiles Promotion",
    status: "active",
    target: "USA",
    leads: 8,
    budget: 1200,
    spent: 900,
    startDate: "2024-02-20",
    endDate: "2024-05-20",
    products: ["Organic Cotton Bedsheets", "Egyptian Cotton Towels"],
    performance: 75,
  },
  {
    id: "3",
    name: "Traditional Crafts Exhibition",
    status: "pending",
    target: "Gulf",
    leads: 0,
    budget: 2000,
    spent: 0,
    startDate: "2024-05-01",
    endDate: "2024-08-01",
    products: ["Handcrafted Jewelry Box", "Traditional Egyptian Rugs"],
    performance: 0,
  },
  {
    id: "4",
    name: "Stone & Marble Export",
    status: "completed",
    target: "Europe",
    leads: 15,
    budget: 1800,
    spent: 1800,
    startDate: "2023-12-01",
    endDate: "2024-03-01",
    products: ["Natural Stone Tiles", "Marble Countertops"],
    performance: 92,
  },
  {
    id: "5",
    name: "Kitchen Essentials Showcase",
    status: "active",
    target: "Multiple",
    leads: 6,
    budget: 2500,
    spent: 1200,
    startDate: "2024-01-15",
    endDate: "2024-05-15",
    products: ["Handmade Copper Cookware", "Olive Wood Cutting Boards"],
    performance: 68,
  }
];

// Types for our campaign data
interface Campaign {
  id: string;
  name: string;
  status: "active" | "pending" | "completed" | "draft";
  target: string;
  leads: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  products: string[];
  performance: number;
}

export default function CampaignsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"all" | "active" | "pending" | "completed" | "draft">("all");
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);

  // Filter campaigns based on active tab
  const filteredCampaigns = activeTab === "all" 
    ? campaigns 
    : campaigns.filter(campaign => campaign.status === activeTab);

  // Handle campaign actions
  const handleCreateCampaign = () => {
    toast({
      title: "Create Campaign",
      description: "Campaign creation feature coming soon!",
    });
  };

  const handleEditCampaign = (campaignId: string) => {
    toast({
      title: "Edit Campaign",
      description: `Editing campaign #${campaignId}`,
    });
  };
  
  const handleViewAnalytics = (campaignId: string) => {
    toast({
      title: "View Analytics",
      description: `Viewing analytics for campaign #${campaignId}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "draft":
        return <Badge className="bg-gray-400">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return "bg-green-500";
    if (performance >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Campaigns</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mt-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h1>
            <p className="text-muted-foreground">
              Manage your export marketing campaigns and track performance.
            </p>
          </div>
          <Button onClick={handleCreateCampaign}>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Campaign stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{campaigns.length}</div>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {campaigns.filter(c => c.status === "active").length}
              </div>
              <Megaphone className="h-4 w-4 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Leads Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {campaigns.reduce((sum, campaign) => sum + campaign.leads, 0)}
              </div>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {Math.round((campaigns.reduce((sum, c) => sum + c.spent, 0) / 
                    campaigns.reduce((sum, c) => sum + c.budget, 0)) * 100)}%
                </div>
                <BarChart2 className="h-4 w-4 text-amber-500" />
              </div>
              <Progress 
                value={(campaigns.reduce((sum, c) => sum + c.spent, 0) / 
                  campaigns.reduce((sum, c) => sum + c.budget, 0)) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Campaigns list */}
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Campaign Management</CardTitle>
              <CardDescription>
                {activeTab === "all" 
                  ? "View and manage all your marketing campaigns" 
                  : `Viewing ${activeTab} campaigns`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Target Market</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        No campaigns found in this category.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {campaign.products.length} products
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Globe className="h-3 w-3 mr-1 text-muted-foreground" />
                            {campaign.target}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-xs">
                              {new Date(campaign.startDate).toLocaleDateString()} - 
                              {new Date(campaign.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">
                              ${campaign.spent} of ${campaign.budget}
                            </div>
                            <Progress 
                              value={(campaign.spent / campaign.budget) * 100} 
                              className="h-1"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{campaign.leads}</TableCell>
                        <TableCell>
                          {campaign.status !== "pending" ? (
                            <div className="space-y-1">
                              <div className="text-xs flex justify-between">
                                <span>Score</span>
                                <span>{campaign.performance}%</span>
                              </div>
                              <Progress 
                                value={campaign.performance} 
                                className={`h-1 ${getPerformanceColor(campaign.performance)}`}
                              />
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">Not started</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditCampaign(campaign.id)}
                              disabled={campaign.status === "completed"}
                            >
                              Edit
                            </Button>
                            {campaign.status !== "pending" && campaign.status !== "draft" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewAnalytics(campaign.id)}
                              >
                                <BarChart2 className="h-3 w-3 mr-1" />
                                Analytics
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
