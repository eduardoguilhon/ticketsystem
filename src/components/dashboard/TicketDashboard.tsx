import React, { useState } from "react";
import TicketFilterBar from "./TicketFilterBar";
import TicketStats from "./TicketStats";
import TicketTable from "./TicketTable";

interface TicketDashboardProps {
  userRole?: "support" | "admin";
  initialFilters?: {
    status?: string;
    priority?: string;
    client?: string;
    search?: string;
  };
}

const TicketDashboard = ({
  userRole = "support",
  initialFilters = {
    status: "all",
    priority: "all",
    client: "all",
    search: "",
  },
}: TicketDashboardProps) => {
  const [filters, setFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(false);

  // Mock stats data
  const statsData = {
    openTickets: 12,
    inProgressTickets: 8,
    completedTickets: 24,
    averageResponseTime: "2h 15m",
  };

  // Handle filter changes from the filter bar
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    // In a real app, this would trigger data fetching with the new filters
    simulateDataFetching();
  };

  // Simulate data fetching with loading state
  const simulateDataFetching = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Handle ticket actions
  const handleViewTicket = (id: string) => {
    console.log(`View ticket ${id}`);
    // In a real app, this would navigate to the ticket detail view
  };

  const handleEditTicket = (id: string) => {
    console.log(`Edit ticket ${id}`);
    // In a real app, this would open an edit form or modal
  };

  const handleDeleteTicket = (id: string) => {
    console.log(`Delete ticket ${id}`);
    // In a real app, this would show a confirmation dialog
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      {/* Filter Bar */}
      <TicketFilterBar onFilterChange={handleFilterChange} />

      {/* Stats Cards */}
      <div className="p-4">
        <TicketStats
          openTickets={statsData.openTickets}
          inProgressTickets={statsData.inProgressTickets}
          completedTickets={statsData.completedTickets}
          averageResponseTime={statsData.averageResponseTime}
        />
      </div>

      {/* Tickets Table */}
      <div className="flex-1 p-4 overflow-auto">
        <TicketTable
          onViewTicket={handleViewTicket}
          onEditTicket={handleEditTicket}
          onDeleteTicket={handleDeleteTicket}
        />
      </div>
    </div>
  );
};

export default TicketDashboard;
