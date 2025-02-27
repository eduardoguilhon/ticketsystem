import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Globe, User, Calendar, RefreshCw } from "lucide-react";

interface TicketInfoProps {
  ticketId?: string;
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
}

const TicketInfo = ({
  ticketId = "TKT-1234",
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
}: TicketInfoProps) => {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card className="w-full bg-white border-gray-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Client Information */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Client</h3>
              <div className="mt-2 flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700">{client.name}</span>
              </div>
            </div>
          </div>

          {/* Assigned Staff */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Assigned To</h3>
              <div className="mt-2 flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={assignedTo.avatar} alt={assignedTo.name} />
                  <AvatarFallback>{assignedTo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700">{assignedTo.name}</span>
              </div>
            </div>
          </div>

          {/* Related Website */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <Globe className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Related Website
              </h3>
              <a
                href={`https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-blue-600 hover:underline"
              >
                {website}
              </a>
            </div>
          </div>

          {/* Creation Date */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <Calendar className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Created On</h3>
              <p className="mt-2 text-sm text-gray-700">
                {formatDate(createdDate)}
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <RefreshCw className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Last Updated
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                {formatDate(lastUpdated)}
              </p>
            </div>
          </div>

          {/* Ticket ID */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <Clock className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Ticket ID</h3>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  {ticketId}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketInfo;
