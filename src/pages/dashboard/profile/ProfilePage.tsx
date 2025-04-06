
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Camera, Shield, Award, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
});

export default function ProfilePage() {
  const { user } = useAuth();
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: "",
      phone: "",
      address: "",
      website: "",
    },
  });

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    console.log(values);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarSrc(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeAvatar = () => {
    setAvatarSrc(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Your Profile</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          {user?.role === "marketer" && (
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          )}
          {user?.role === "factory" && (
            <TabsTrigger value="company">Company Info</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
                  <div className="mb-4 sm:mb-0">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarSrc || ""} />
                        <AvatarFallback className="text-lg">
                          {user?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      {avatarSrc && (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={removeAvatar}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <label
                      htmlFor="avatar-upload"
                      className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent"
                    >
                      <Camera className="h-4 w-4" />
                      Change Photo
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </label>
                  </div>

                  <div className="w-full space-y-2">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Your email"
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                              <FormDescription>
                                Email cannot be changed
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about yourself"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Brief description for your profile.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your phone number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your address"
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
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://your-website.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit">Save changes</Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <Button className="mt-4">Update Password</Button>
              </div>

              <div className="pt-6 pb-2">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user?.role === "marketer" && (
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>
                  Track your progress and unlock new levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Star
                        className="h-8 w-8 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Marketer Level 2</h3>
                      <p className="text-sm text-muted-foreground">
                        You've generated 12 leads so far
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Badge className="bg-primary text-white">
                      25% to Level 3
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">Your Badges</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                      <Award className="mb-2 h-8 w-8 text-amber-500" />
                      <span className="text-sm font-medium">First Lead</span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                      <Award className="mb-2 h-8 w-8 text-blue-500" />
                      <span className="text-sm font-medium">5 Leads</span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border p-4 opacity-50">
                      <Award className="mb-2 h-8 w-8 text-green-500" />
                      <span className="text-sm font-medium">25 Leads</span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border p-4 opacity-50">
                      <Award className="mb-2 h-8 w-8 text-purple-500" />
                      <span className="text-sm font-medium">First Sale</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">
                    Specialization Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Furniture Expert</span>
                        <span>7/10</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary/20">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: "70%" }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Textiles Specialist</span>
                        <span>3/10</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary/20">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: "30%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Achievements
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}

        {user?.role === "factory" && (
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Manage your company details and documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      placeholder="Your company name"
                      defaultValue="Cairo Crafts Ltd."
                    />
                  </div>
                  <div>
                    <Label htmlFor="tax-id">Tax ID / Registration Number</Label>
                    <Input
                      id="tax-id"
                      placeholder="Your company tax ID"
                      defaultValue="EG123456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company-size">Company Size</Label>
                    <Input
                      id="company-size"
                      placeholder="Number of employees"
                      defaultValue="50-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year-founded">Year Founded</Label>
                    <Input
                      id="year-founded"
                      placeholder="Year founded"
                      defaultValue="2010"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-description">
                    Company Description
                  </Label>
                  <Textarea
                    id="company-description"
                    placeholder="Tell us about your company"
                    defaultValue="Cairo Crafts is a leading manufacturer of handcrafted furniture and home goods, specializing in traditional Egyptian designs with modern functionality."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Certifications & Documents</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-10 w-10 flex-shrink-0 rounded bg-primary/10 p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">ISO 9001 Certificate</p>
                            <p className="text-sm text-muted-foreground">
                              Added on Jan 15, 2023
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-10 w-10 flex-shrink-0 rounded bg-primary/10 p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Export License</p>
                            <p className="text-sm text-muted-foreground">
                              Added on Mar 5, 2023
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="document-upload"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-3 text-sm hover:bg-accent"
                    >
                      <Upload className="h-4 w-4" />
                      Upload New Document
                      <input
                        id="document-upload"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Company Information</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
