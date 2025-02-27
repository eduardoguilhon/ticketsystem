import React from "react";
import ClientTicketStats from "./ClientTicketStats";
import ClientTicketList from "./ClientTicketList";
import QuickActions from "./QuickActions";

interface ClientDashboardProps {
  clientName?: string;
  ticketStats?: {
    openTickets: number;
    inProgressTickets: number;
    completedTickets: number;
  };
  onViewTicket?: (ticketId: string) => void;
  onCreateTicket?: () => void;
  onViewRecentTickets?: () => void;
  onUpdateProfile?: () => void;
}

const ClientDashboard = ({
  clientName = "Your Company",
  ticketStats = {
    openTickets: 5,
    inProgressTickets: 3,
    completedTickets: 12,
  },
  onViewTicket = () => console.log("View ticket clicked"),
  onCreateTicket = () => console.log("Create ticket clicked"),
  onViewRecentTickets = () => console.log("View recent tickets clicked"),
  onUpdateProfile = () => console.log("Update profile clicked"),
}: ClientDashboardProps) => {
  // Custom actions for QuickActions component
  const quickActions = [
    {
      id: "new-ticket",
      title: "Create New Ticket",
      description: "Report a new issue or request support",
      icon: <PlusCircle className="h-8 w-8 text-primary" />,
      onClick: onCreateTicket,
    },
    {
      id: "recent-tickets",
      title: "View Recent Tickets",
      description: "Check the status of your recent support requests",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      onClick: onViewRecentTickets,
    },
    {
      id: "update-profile",
      title: "Update Profile",
      description: "Manage your account information and preferences",
      icon: <UserCircle className="h-8 w-8 text-green-500" />,
      onClick: onUpdateProfile,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold">{clientName} Dashboard</h1>
          <Button onClick={onCreateTicket} className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Ticket
          </Button>
        </div>

        {/* Ticket Statistics */}
        <ClientTicketStats
          openTickets={ticketStats.openTickets}
          inProgressTickets={ticketStats.inProgressTickets}
          completedTickets={ticketStats.completedTickets}
          clientName={clientName}
        />

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Ticket List */}
        <ClientTicketList onViewTicket={onViewTicket} />
      </div>
    </div>
  );
};

export default ClientDashboard;

// Import icons
import { PlusCircle, Clock, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
