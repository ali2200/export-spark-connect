
import { useAuth } from "@/context/AuthContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, UserPlus, Users, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Sample data for charts
const visitData = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
  { name: "Jul", value: 4300 },
];

const performanceData = [
  { name: "Mon", leads: 4, views: 20 },
  { name: "Tue", leads: 3, views: 15 },
  { name: "Wed", leads: 5, views: 25 },
  { name: "Thu", leads: 7, views: 30 },
  { name: "Fri", leads: 2, views: 18 },
  { name: "Sat", leads: 1, views: 10 },
  { name: "Sun", leads: 3, views: 12 },
];

// Stats card component
interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

function StatsCard({ title, value, description, icon, trend, trendValue }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="flex items-center mt-2">
          {trend === "up" && <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />}
          {trend === "down" && <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />}
          <span className={`text-xs ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : ""}`}>
            {trendValue}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const { user } = useAuth();
  const isMarketer = user?.role === "marketer";
  const isFactory = user?.role === "factory";

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
              <BreadcrumbPage>Analytics</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-3xl font-bold tracking-tight mt-4">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          {isMarketer 
            ? "Track your marketing performance and lead generation metrics."
            : "Monitor your product visibility and lead acquisition metrics."}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Leads" 
          value="128" 
          description="Total leads generated" 
          icon={<UserPlus className="h-4 w-4 text-primary" />}
          trend="up"
          trendValue="+14% from last month"
        />
        <StatsCard 
          title="Profile Views" 
          value="2,451" 
          description="Total profile visits" 
          icon={<Users className="h-4 w-4 text-primary" />}
          trend="up"
          trendValue="+5.2% from last month"
        />
        <StatsCard 
          title={isFactory ? "Products Listed" : "Products Promoted"} 
          value={isFactory ? "24" : "18"} 
          description="Active listings" 
          icon={<Package className="h-4 w-4 text-primary" />}
          trend="neutral"
          trendValue="No change"
        />
        <StatsCard 
          title="Conversion Rate" 
          value="3.2%" 
          description="Views to leads" 
          icon={<BarChart3 className="h-4 w-4 text-primary" />}
          trend="down"
          trendValue="-0.5% from last month"
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Overview</CardTitle>
              <CardDescription>Profile visits over the last 7 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#1E40AF" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Views vs leads for the last week</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#E2E8F0" />
                  <Bar dataKey="leads" fill="#1E40AF" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Leads Analysis</CardTitle>
              <CardDescription>Detailed breakdown of lead sources and conversion</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] grid place-items-center">
              <p className="text-muted-foreground">Coming soon: Advanced leads analysis dashboard</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traffic">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Analysis of your traffic sources and user behavior</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] grid place-items-center">
              <p className="text-muted-foreground">Coming soon: Detailed traffic analytics</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
