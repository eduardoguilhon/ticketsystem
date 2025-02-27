import React, { useState } from "react";
import TicketHeader from "./TicketHeader";
import TicketInfo from "./TicketInfo";
import TicketConversation from "./TicketConversation";
import TicketReplyForm from "./TicketReplyForm";

interface TicketDetailViewProps {
  ticketId?: string;
  subject?: string;
  status?: "open" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high" | "urgent";
  client?: {
    name: string;
    avatar?: string;
  };
  assignedTo?: {
    name: string;
    avatar?: string;
  };
  createdDate?: string;
  lastUpdated?: string;
  website?: string;
  messages?: Array<{
    id: string;
    sender: {
      id: string;
      name: string;
      avatar?: string;
      role: "client" | "support";
    };
    content: string;
    timestamp: string;
    attachments?: Array<{
      id: string;
      name: string;
      url: string;
    }>;
  }>;
  onStatusChange?: (status: string) => void;
  onPriorityChange?: (priority: string) => void;
  onReplySubmit?: (data: { message: string; attachments: File[] }) => void;
  onBack?: () => void;
}

const TicketDetailView = ({
  ticketId = "TKT-1234",
  subject = "Unable to access admin dashboard after recent update",
  status = "open",
  priority = "medium",
  client = {
    name: "Acme Corporation",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=acme",
  },
  assignedTo = {
    name: "John Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  createdDate = "2023-06-15T10:30:00",
  lastUpdated = "2023-06-16T14:45:00",
  website = "www.acmecorp.com",
  messages = [
    {
      id: "1",
      sender: {
        id: "client-1",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        role: "client",
      },
      content:
        "I'm having issues with the login functionality on our website. Users are reporting that they can't reset their passwords.",
      timestamp: "2023-06-15T09:30:00Z",
      attachments: [
        {
          id: "att-1",
          name: "error_screenshot.png",
          url: "#",
        },
      ],
    },
    {
      id: "2",
      sender: {
        id: "support-1",
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        role: "support",
      },
      content:
        "Thank you for reporting this issue. Could you please provide more details about when this started happening? Are there any error messages displayed?",
      timestamp: "2023-06-15T10:15:00Z",
      attachments: [],
    },
    {
      id: "3",
      sender: {
        id: "client-1",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        role: "client",
      },
      content:
        'It started yesterday afternoon. Users get a "Server Error" message when they click on the "Forgot Password" link. I\'ve attached another screenshot showing the console errors.',
      timestamp: "2023-06-15T11:05:00Z",
      attachments: [
        {
          id: "att-2",
          name: "console_errors.png",
          url: "#",
        },
      ],
    },
    {
      id: "4",
      sender: {
        id: "support-1",
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        role: "support",
      },
      content:
        "I've checked our logs and found the issue. There was a problem with our email service provider. We've switched to a backup provider and the password reset functionality should be working now. Could you please verify?",
      timestamp: "2023-06-15T13:30:00Z",
      attachments: [],
    },
  ],
  onStatusChange = () => {},
  onPriorityChange = () => {},
  onReplySubmit = () => {},
  onBack = () => {},
}: TicketDetailViewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReplySubmit = (data: {
    message: string;
    attachments: File[];
  }) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onReplySubmit(data);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      {/* Ticket Header */}
      <TicketHeader
        ticketId={ticketId}
        subject={subject}
        status={status}
        priority={priority}
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
        onBack={onBack}
      />

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Ticket Information */}
        <TicketInfo
          ticketId={ticketId}
          client={client}
          assignedTo={assignedTo}
          createdDate={createdDate}
          lastUpdated={lastUpdated}
          website={website}
        />

        {/* Ticket Conversation */}
        <div className="h-[500px] flex flex-col">
          <TicketConversation messages={messages} ticketId={ticketId} />
        </div>

        {/* Reply Form */}
        <TicketReplyForm
          onSubmit={handleReplySubmit}
          isLoading={isSubmitting}
          placeholder="Type your reply here..."
        />
      </div>
    </div>
  );
};

export default TicketDetailView;
