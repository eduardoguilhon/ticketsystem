import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Clock, Paperclip } from "lucide-react";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: "client" | "support";
  };
  content: string;
  timestamp: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
  }[];
}

interface TicketConversationProps {
  messages?: Message[];
  ticketId?: string;
}

const TicketConversation = ({
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
  ticketId = "TKT-1234",
}: TicketConversationProps) => {
  return (
    <div className="w-full h-full bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium">Conversation History</h3>
        <p className="text-sm text-gray-500">Ticket #{ticketId}</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-4">
              <Avatar className="h-10 w-10 mt-1">
                {message.sender.avatar ? (
                  <AvatarImage
                    src={message.sender.avatar}
                    alt={message.sender.name}
                  />
                ) : (
                  <AvatarFallback>
                    {message.sender.name.substring(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{message.sender.name}</span>
                  <Badge
                    variant={
                      message.sender.role === "support"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      message.sender.role === "support"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {message.sender.role === "support"
                      ? "Support Agent"
                      : "Client"}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500 ml-auto">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(message.timestamp).toLocaleString()}
                  </div>
                </div>

                <div className="text-sm bg-gray-50 p-3 rounded-md">
                  {message.content}
                </div>

                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1 flex items-center">
                      <Paperclip className="h-3 w-3 mr-1" />
                      Attachments ({message.attachments.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {message.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={attachment.url}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-blue-600 px-2 py-1 rounded flex items-center"
                        >
                          <Paperclip className="h-3 w-3 mr-1" />
                          {attachment.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      <div className="p-3 bg-gray-50 text-xs text-gray-500 text-center">
        End of conversation history. Use the reply form below to respond.
      </div>
    </div>
  );
};

export default TicketConversation;
