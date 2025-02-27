import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import TicketDashboard from "./dashboard/TicketDashboard";
import ClientDashboard from "./client/ClientDashboard";
import NotificationCenter from "./notifications/NotificationCenter";

interface HomeProps {
  userRole?: "support" | "client";
  userName?: string;
  userAvatar?: string;
}

const Home = ({
  userRole = "support",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
}: HomeProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Toggle sidebar visibility (for mobile responsiveness)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle notifications panel
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  // Handle navigation to ticket detail view
  const handleViewTicket = (ticketId: string) => {
    navigate(`/tickets/${ticketId}`);
  };

  // Handle navigation to create ticket form
  const handleCreateTicket = () => {
    navigate("/tickets/new");
  };

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, this would clear auth state and redirect to login
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar - hidden on mobile when closed */}
      <div
        className={`fixed inset-y-0 left-0 z-20 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <Sidebar
          userRole={userRole}
          userName={userName}
          userAvatar={userAvatar}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          userName={userName}
          userAvatar={userAvatar}
          unreadNotifications={3}
          onMenuToggle={toggleSidebar}
        />

        {/* Dashboard Content - conditionally render based on user role */}
        <main className="flex-1 overflow-auto">
          {userRole === "support" ? (
            <TicketDashboard
              userRole="support"
              initialFilters={{
                status: "all",
                priority: "all",
                client: "all",
                search: "",
              }}
            />
          ) : (
            <ClientDashboard
              clientName="Acme Corporation"
              ticketStats={{
                openTickets: 5,
                inProgressTickets: 3,
                completedTickets: 12,
              }}
              onViewTicket={handleViewTicket}
              onCreateTicket={handleCreateTicket}
            />
          )}
        </main>
      </div>

      {/* Notifications Panel - conditionally rendered */}
      {notificationsOpen && (
        <div className="fixed right-4 top-16 z-30 animate-in fade-in slide-in-from-top-5 duration-300">
          <NotificationCenter
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
            onNotificationClick={(notification) => {
              if (notification.ticketId) {
                handleViewTicket(notification.ticketId);
                setNotificationsOpen(false);
              }
            }}
          />
        </div>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-10"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Home;
