
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Calendar,
  Package,
  User,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Globe,
  DollarSign,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface LeadDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
  userRole: string;
}

export function LeadDetailDialog({
  isOpen,
  onClose,
  lead,
  userRole,
}: LeadDetailDialogProps) {
  const [status, setStatus] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { toast } = useToast();

  // Set current status when lead changes
  if (lead && status === "") {
    setStatus(lead.status);
  }

  // Mock comments data
  const comments = [
    {
      id: 1,
      user: "Ahmed Hassan",
      role: "Marketer",
      text: "Initial contact made. The client is interested in bulk order for a hotel renovation project.",
      date: "2024-04-01 14:30",
    },
    {
      id: 2,
      user: "Mohammed Ali",
      role: "Factory Representative",
      text: "Requested more details about delivery timeline and customization options.",
      date: "2024-04-02 09:15",
    },
    {
      id: 3,
      user: "Ahmed Hassan",
      role: "Marketer",
      text: "Client wants samples before placing full order. They can pay for the samples.",
      date: "2024-04-02 16:45",
    },
  ];

  if (!lead) return null;

  // Status text and color mapping
  const getStatusDetails = (statusCode: string) => {
    const statuses: Record<
      string,
      { label: string; color: string; description: string }
    > = {
      new: {
        label: "New Lead",
        color: "bg-blue-500",
        description: "Newly submitted lead awaiting initial contact",
      },
      contacted: {
        label: "Contacted",
        color: "bg-purple-500",
        description: "Initial contact made with the client",
      },
      negotiating: {
        label: "Negotiating",
        color: "bg-yellow-500",
        description: "Active negotiations with the client",
      },
      sample_requested: {
        label: "Sample Requested",
        color: "bg-orange-500",
        description: "Client has requested product samples",
      },
      closed: {
        label: "Deal Closed",
        color: "bg-green-500",
        description: "Deal successfully closed and order placed",
      },
      lost: {
        label: "Lost",
        color: "bg-red-500",
        description: "Lead lost or client no longer interested",
      },
    };

    return statuses[statusCode] || { label: statusCode, color: "bg-gray-500", description: "" };
  };

  // Handle status update
  const handleUpdateStatus = () => {
    toast({
      title: "Status updated",
      description: `Lead status updated to ${getStatusDetails(status).label}.`,
    });
  };

  // Handle add comment
  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the lead.",
    });
    setComment("");
  };

  // Handle contact client
  const handleContactClient = () => {
    toast({
      title: "Contact information",
      description: "Client contact details have been sent to your email.",
    });
  };

  const statusDetails = getStatusDetails(lead.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lead from {lead.clientName}</DialogTitle>
          <div className="flex items-center gap-2">
            <Badge className={statusDetails.color}>{statusDetails.label}</Badge>
            <DialogDescription>{statusDetails.description}</DialogDescription>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-4">Client Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{lead.clientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Lead date: {lead.date}</span>
                </div>
                {userRole === "factory" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>contact@{lead.clientName.toLowerCase().replace(/\s+/g, '')}.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+971 55 123 4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.clientName.toLowerCase().replace(/\s+/g, '')}.com</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium text-lg mb-4">Product Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{lead.product}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Manufactured by {lead.factoryName}</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 mt-0.5 text-muted-foreground"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="20" rx="2" ry="2" width="16" x="4" y="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" />
                    <path d="M16 6h.01" />
                    <path d="M12 9h.01" />
                    <path d="M8 12h.01" />
                    <path d="M16 12h.01" />
                    <path d="M12 15h.01" />
                  </svg>
                  <span>Quantity requested: {lead.quantity} units</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Potential value: ${lead.value.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            {userRole === "factory" && (
              <>
                <Separator />
                <div>
                  <h3 className="font-medium text-lg mb-4">Marketer Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{lead.marketerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.marketerName.toLowerCase().replace(/\s+/g, '')}@exportbase.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-muted-foreground"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2v20" />
                        <path d="m17 5-5-3-5 3" />
                        <path d="m17 19-5 3-5-3" />
                        <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                      </svg>
                      <span>Experience level: Intermediate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-muted-foreground"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14 19.9V16h3a2 2 0 0 0 2-2v-2H5v2c0 1.1.9 2 2 2h3v3.9" />
                        <path d="M6 12V8a2 2 0 0 1 2-2h3V2" />
                        <path d="M18 12V8a2 2 0 0 0-2-2h-3V2" />
                        <path d="M12 2v5" />
                        <path d="M12 17v5" />
                      </svg>
                      <span>28 successful leads</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-4">Lead Timeline</h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-muted rounded-md p-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{comment.user}</span>
                      <span className="text-xs text-muted-foreground">
                        {comment.date}
                      </span>
                    </div>
                    <span className="text-xs text-blue-600 mb-2 block">
                      {comment.role}
                    </span>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Add Comment</h3>
              </div>
              <Textarea
                placeholder="Add your comment or update..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <Button
                onClick={handleAddComment}
                className="w-full"
                disabled={!comment.trim()}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Update Status</h3>
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Lead</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="negotiating">Negotiating</SelectItem>
                  <SelectItem value="sample_requested">
                    Sample Requested
                  </SelectItem>
                  <SelectItem value="closed">Deal Closed</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleUpdateStatus}
                variant="outline"
                className="w-full"
              >
                <Clock className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:w-auto">
            Close
          </Button>
          
          {userRole === "factory" && (
            <Button 
              onClick={handleContactClient} 
              className="sm:w-auto"
            >
              Contact Client
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
