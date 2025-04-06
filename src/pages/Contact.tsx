
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };
  
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about our platform? Want to know more about how we connect 
          factories with international marketers? Get in touch with our team.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="font-medium">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="font-medium">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full md:w-auto" 
              size={isMobile ? "lg" : "default"}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
        
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Our Location</h3>
                <p className="text-muted-foreground">
                  123 Export Avenue, <br />
                  Smart Village, Cairo, <br />
                  Egypt
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email Us</h3>
                <p className="text-muted-foreground">
                  info@exportspark.com <br />
                  support@exportspark.com
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Call Us</h3>
                <p className="text-muted-foreground">
                  +20 2 1234 5678 <br />
                  +20 2 8765 4321
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 5:00 PM <br />
                  Saturday: 10:00 AM - 2:00 PM <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-muted p-6 rounded-lg">
            <h3 className="font-medium mb-3">Join Our Network</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Whether you're a factory looking to expand your reach or a marketer 
              interested in representing Egyptian products, we're here to help connect you.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href="/signup">Register Now</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
