import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Clock, CheckCircle } from "lucide-react";

interface ClientTicketStatsProps {
  openTickets?: number;
  inProgressTickets?: number;
  completedTickets?: number;
  clientName?: string;
}

const ClientTicketStats = ({
  openTickets = 5,
  inProgressTickets = 3,
  completedTickets = 12,
  clientName = "Your Company",
}: ClientTicketStatsProps) => {
  return (
    <div className="w-full bg-background p-4">
      <h2 className="text-xl font-semibold mb-4">
        {clientName} Ticket Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Open Tickets Card */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Ticket className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold">{openTickets}</span>
              </div>
              <div className="text-xs text-muted-foreground bg-blue-100 px-2 py-1 rounded-full">
                Awaiting Response
              </div>
            </div>
          </CardContent>
        </Card>

        {/* In Progress Tickets Card */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-amber-500" />
                <span className="text-2xl font-bold">{inProgressTickets}</span>
              </div>
              <div className="text-xs text-muted-foreground bg-amber-100 px-2 py-1 rounded-full">
                Being Worked On
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed Tickets Card */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <span className="text-2xl font-bold">{completedTickets}</span>
              </div>
              <div className="text-xs text-muted-foreground bg-green-100 px-2 py-1 rounded-full">
                Successfully Resolved
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientTicketStats;
