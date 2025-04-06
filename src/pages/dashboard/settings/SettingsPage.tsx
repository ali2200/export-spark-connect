
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  CreditCard, 
  Smartphone,
  Mail,
  Check,
  X
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Form states
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    leadAlerts: true,
    productUpdates: true,
    marketingTips: false,
    platformNews: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30"
  });

  const handleSaveProfile = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved."
      });
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved."
      });
    }, 1000);
  };

  const handleSaveSecurity = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Security settings updated",
        description: "Your security preferences have been saved."
      });
    }, 1000);
  };

  const toggleTwoFactor = () => {
    setSecuritySettings({
      ...securitySettings,
      twoFactorAuth: !securitySettings.twoFactorAuth
    });

    toast({
      title: securitySettings.twoFactorAuth 
        ? "Two-factor authentication disabled" 
        : "Two-factor authentication enabled",
      description: securitySettings.twoFactorAuth 
        ? "Your account is now less secure." 
        : "Your account is now more secure."
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-fit">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal and business information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.name || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+20 123 456 7890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Cairo, Egypt" />
                  </div>
                </div>
              </div>

              <Separator />

              {user?.role === "factory" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Company Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="Al-Mahmoud Furniture" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-website">Website</Label>
                      <Input id="company-website" type="url" defaultValue="https://almahmoud.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select defaultValue="furniture">
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="textiles">Textiles</SelectItem>
                          <SelectItem value="food">Food & Beverages</SelectItem>
                          <SelectItem value="construction">Construction Materials</SelectItem>
                          <SelectItem value="chemicals">Chemicals</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="establishment">Year Established</Label>
                      <Input id="establishment" type="number" defaultValue="2005" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="company-address">Company Address</Label>
                      <Input id="company-address" defaultValue="123 Industrial Zone, New Cairo, Egypt" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="company-description">Company Description</Label>
                      <Textarea 
                        id="company-description" 
                        className="min-h-24" 
                        defaultValue="Premium manufacturer of high-quality wooden furniture, specializing in dining tables, bedroom sets, and custom designs for commercial projects." 
                      />
                    </div>
                  </div>
                </div>
              )}

              {user?.role === "marketer" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Professional Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select defaultValue="furniture">
                        <SelectTrigger id="specialization">
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="textiles">Textiles</SelectItem>
                          <SelectItem value="food">Food & Beverages</SelectItem>
                          <SelectItem value="construction">Construction Materials</SelectItem>
                          <SelectItem value="multiple">Multiple Categories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input id="experience" type="number" defaultValue="5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="markets">Primary Markets</Label>
                      <Select defaultValue="gulf">
                        <SelectTrigger id="markets">
                          <SelectValue placeholder="Select primary market" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gulf">Gulf Countries</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="usa">USA & Canada</SelectItem>
                          <SelectItem value="africa">Africa</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="languages">Languages Spoken</Label>
                      <Input id="languages" defaultValue="Arabic, English, French" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea 
                        id="bio" 
                        className="min-h-24" 
                        defaultValue="Experienced export marketer specializing in furniture and home goods. Strong connections with retailers in Gulf countries and Europe." 
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? (
                  <>
                    <span className="animate-spin mr-2">⚪</span>
                    Saving...
                  </>
                ) : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications and updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, emailNotifications: checked})
                      }
                    />
                  </div>

                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="lead-alerts">Lead Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you receive new leads
                      </p>
                    </div>
                    <Switch
                      id="lead-alerts" 
                      checked={notificationSettings.leadAlerts}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, leadAlerts: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="product-updates">Product Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about products you're marketing
                      </p>
                    </div>
                    <Switch
                      id="product-updates"
                      checked={notificationSettings.productUpdates}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, productUpdates: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-tips">Marketing Tips</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive regular marketing tips and strategies
                      </p>
                    </div>
                    <Switch 
                      id="marketing-tips"
                      checked={notificationSettings.marketingTips}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, marketingTips: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="platform-news">Platform News</Label>
                      <p className="text-sm text-muted-foreground">
                        Stay updated about new features and improvements
                      </p>
                    </div>
                    <Switch 
                      id="platform-news"
                      checked={notificationSettings.platformNews}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, platformNews: checked})
                      }
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Communication Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-frequency">Email Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="email-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real-time">Real-time</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language-preference">Preferred Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language-preference">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveNotifications} disabled={saving}>
                {saving ? (
                  <>
                    <span className="animate-spin mr-2">⚪</span>
                    Saving...
                  </>
                ) : "Save preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>

                <div className="mt-2">
                  <Button variant="outline">Update Password</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Two-Factor Authentication (2FA)</div>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {securitySettings.twoFactorAuth ? (
                      <div className="flex items-center text-sm text-green-600">
                        <Check className="h-4 w-4 mr-1" /> Enabled
                      </div>
                    ) : (
                      <div className="flex items-center text-sm text-amber-600">
                        <X className="h-4 w-4 mr-1" /> Disabled
                      </div>
                    )}
                    <Button 
                      variant={securitySettings.twoFactorAuth ? "destructive" : "default"}
                      size="sm"
                      onClick={toggleTwoFactor}
                    >
                      {securitySettings.twoFactorAuth ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Login & Session</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="login-alerts">Login Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                    <Switch 
                      id="login-alerts"
                      checked={securitySettings.loginAlerts}
                      onCheckedChange={(checked) => 
                        setSecuritySettings({...securitySettings, loginAlerts: checked})
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select 
                      defaultValue={securitySettings.sessionTimeout}
                      onValueChange={(value) => 
                        setSecuritySettings({...securitySettings, sessionTimeout: value})
                      }
                    >
                      <SelectTrigger id="session-timeout">
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      Automatically log out after period of inactivity
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveSecurity} disabled={saving}>
                {saving ? (
                  <>
                    <span className="animate-spin mr-2">⚪</span>
                    Saving...
                  </>
                ) : "Save security settings"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Devices</CardTitle>
              <CardDescription>
                Manage devices that are currently signed in to your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <Smartphone className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium">iPhone 13 Pro</p>
                      <p className="text-sm text-muted-foreground">Cairo, Egypt • Current device</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">This Device</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium">Chrome Browser • MacBook Pro</p>
                      <p className="text-sm text-muted-foreground">Alexandria, Egypt • 3 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Log Out</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your subscription and payment information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="mt-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-lg">
                        {user?.role === "factory" ? "Factory Pro Plan" : "Marketer Standard Plan"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user?.role === "factory" 
                          ? "Unlimited products, advanced analytics, priority support" 
                          : "Up to 20 active campaigns, basic analytics"}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p>
                      <span className="text-2xl font-bold">
                        ${user?.role === "factory" ? "49" : "19"}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 04/2025</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Billing History</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">Date</th>
                        <th className="text-left p-3 text-sm font-medium">Description</th>
                        <th className="text-right p-3 text-sm font-medium">Amount</th>
                        <th className="text-right p-3 text-sm font-medium">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 text-sm">Apr 1, 2024</td>
                        <td className="p-3 text-sm">
                          {user?.role === "factory" ? "Factory Pro Plan" : "Marketer Standard Plan"}
                        </td>
                        <td className="p-3 text-sm text-right">
                          ${user?.role === "factory" ? "49.00" : "19.00"}
                        </td>
                        <td className="p-3 text-sm text-right">
                          <Button variant="link" size="sm" className="h-auto p-0">PDF</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-sm">Mar 1, 2024</td>
                        <td className="p-3 text-sm">
                          {user?.role === "factory" ? "Factory Pro Plan" : "Marketer Standard Plan"}
                        </td>
                        <td className="p-3 text-sm text-right">
                          ${user?.role === "factory" ? "49.00" : "19.00"}
                        </td>
                        <td className="p-3 text-sm text-right">
                          <Button variant="link" size="sm" className="h-auto p-0">PDF</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
