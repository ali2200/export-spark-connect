
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowUpRight, ChevronUp, LineChart, Package, TrendingUp, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  const { user } = useAuth();

  // Factory dashboard content
  const factoryDashboard = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Marketers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center text-xs text-green-600">
              <ChevronUp className="h-3 w-3 mr-1" />
              <span>+3 new this week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <div className="flex items-center text-xs text-green-600">
              <ChevronUp className="h-3 w-3 mr-1" />
              <span>+7 since last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Potential Revenue</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-muted-foreground">
              From 23 active leads
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>
              New potential buyers for your products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">Premium Wooden Bed Frame</p>
                    <p className="text-sm text-muted-foreground">Saudi Furniture Ltd • Saudi Arabia</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-export-orange-500">500 units</span>
                    <ArrowUpRight className="h-4 w-4 text-export-orange-500" />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              <Link to="/dashboard/leads" className="flex items-center justify-center w-full">
                View All Leads
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Active Marketers</CardTitle>
            <CardDescription>
              Marketers promoting your products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-export-blue-100 flex items-center justify-center text-export-blue-600 font-medium">
                      {String.fromCharCode(64 + i)}
                    </span>
                    <div>
                      <p className="font-medium">Ahmed Hassan</p>
                      <p className="text-sm text-muted-foreground">4 Products • 7 Leads</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      i === 1 ? "bg-green-100 text-green-700" :
                      i === 2 ? "bg-blue-100 text-blue-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {i === 1 ? "Expert" : i === 2 ? "Intermediate" : "Beginner"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              <Link to="/dashboard/marketers" className="flex items-center justify-center w-full">
                View All Marketers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Marketer dashboard content
  const marketerDashboard = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Products Selected</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              From 3 factories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Leads Submitted</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-green-600">
              <ChevronUp className="h-3 w-3 mr-1" />
              <span>+4 this month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <div className="flex items-center text-xs text-green-600">
              <ChevronUp className="h-3 w-3 mr-1" />
              <span>+3% improvement</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Potential Earnings</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,450</div>
            <p className="text-xs text-muted-foreground">
              From 5 active leads
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>My Leads</CardTitle>
            <CardDescription>
              Recent leads you've submitted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">Premium Wooden Dining Table</p>
                    <p className="text-sm text-muted-foreground">Al-Mahmoud Furniture • Lead #{i + 1000}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      i === 1 ? "bg-green-100 text-green-700" :
                      i === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {i === 1 ? "Closed" : i === 2 ? "Negotiating" : "New"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              <Link to="/dashboard/leads" className="flex items-center justify-center w-full">
                View All Leads
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>
              Your export marketing achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-export-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Your Level</h4>
                  <span className="px-2 py-1 text-xs bg-export-blue-100 text-export-blue-700 rounded-full">
                    Intermediate
                  </span>
                </div>
                <div className="w-full bg-export-blue-100 rounded-full h-2 mb-1">
                  <div className="bg-export-blue-600 h-2 rounded-full w-[65%]"></div>
                </div>
                <p className="text-xs text-muted-foreground">65% to next level: Expert</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    ✓
                  </span>
                  <div>
                    <p className="font-medium">Basic Exporter</p>
                    <p className="text-xs text-muted-foreground">Completed 5 leads</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    ✓
                  </span>
                  <div>
                    <p className="font-medium">Furniture Specialist</p>
                    <p className="text-xs text-muted-foreground">Completed 3 furniture deals</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    ?
                  </span>
                  <div>
                    <p className="font-medium">Gulf Region Expert</p>
                    <p className="text-xs text-muted-foreground">Need 2 more Gulf deals</p>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              <Link to="/dashboard/training" className="flex items-center justify-center w-full">
                View All Badges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Admin dashboard content
  const adminDashboard = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Factories</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              +6 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Marketers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <div className="flex items-center text-xs text-green-600">
              <ChevronUp className="h-3 w-3 mr-1" />
              <span>+15 this week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">286</div>
            <div className="flex items-center text-xs text-green-600">
              <ChevronUp className="h-3 w-3 mr-1" />
              <span>+28 this month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              $235,500 in revenue
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest platform activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Global Furniture Inc signed up as a new factory",
                "Ahmed M. submitted 3 new leads for wooden chairs",
                "Sara T. achieved Expert Exporter badge",
                "Egyptian Textiles Ltd upgraded to Premium plan",
                "New product verification needed: Glass Dining Table"
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm">{activity}</p>
                    <p className="text-xs text-muted-foreground">{i + 1} hour{i !== 0 ? 's' : ''} ago</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              <Link to="/dashboard/activities" className="flex items-center justify-center w-full">
                View All Activities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">User Growth</span>
                  <span className="text-sm font-medium text-export-blue-600">+27%</span>
                </div>
                <div className="w-full bg-export-blue-100 rounded-full h-2 mb-3">
                  <div className="bg-export-blue-600 h-2 rounded-full w-[78%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Product Listings</span>
                  <span className="text-sm font-medium text-export-blue-600">+15%</span>
                </div>
                <div className="w-full bg-export-blue-100 rounded-full h-2 mb-3">
                  <div className="bg-export-blue-600 h-2 rounded-full w-[65%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="text-sm font-medium text-export-orange-600">+8%</span>
                </div>
                <div className="w-full bg-export-blue-100 rounded-full h-2 mb-3">
                  <div className="bg-export-orange-500 h-2 rounded-full w-[42%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Revenue Growth</span>
                  <span className="text-sm font-medium text-export-blue-600">+32%</span>
                </div>
                <div className="w-full bg-export-blue-100 rounded-full h-2 mb-3">
                  <div className="bg-export-blue-600 h-2 rounded-full w-[82%]"></div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              <Link to="/dashboard/analytics" className="flex items-center justify-center w-full">
                View Full Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
        <p className="text-muted-foreground">
          Here's what's happening with your {user?.role === "factory" ? "factory" : user?.role === "admin" ? "platform" : "marketing"} today.
        </p>
      </div>
      
      {/* Display dashboard based on user role */}
      {user?.role === "factory" && factoryDashboard}
      {user?.role === "marketer" && marketerDashboard}
      {user?.role === "admin" && adminDashboard}
    </div>
  );
}
