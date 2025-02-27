import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  BarChart3,
  Ticket,
  PlusCircle,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  userRole?: "support" | "client";
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const Sidebar = ({
  userRole = "support",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  onLogout = () => console.log("Logout clicked"),
}: SidebarProps) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    tickets: true,
    clients: false,
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const supportNavItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Tickets",
      icon: <Ticket className="h-5 w-5" />,
      submenu: true,
      submenuItems: [
        { name: "All Tickets", path: "/tickets" },
        { name: "Open", path: "/tickets/open" },
        { name: "In Progress", path: "/tickets/in-progress" },
        { name: "Completed", path: "/tickets/completed" },
      ],
    },
    {
      name: "Clients",
      icon: <Users className="h-5 w-5" />,
      submenu: true,
      submenuItems: [
        { name: "All Clients", path: "/clients" },
        { name: "Add New Client", path: "/clients/new" },
      ],
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const clientNavItems = [
    {
      name: "Dashboard",
      path: "/client-dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "My Tickets",
      path: "/my-tickets",
      icon: <Ticket className="h-5 w-5" />,
    },
    {
      name: "New Ticket",
      path: "/new-ticket",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserCircle className="h-5 w-5" />,
    },
  ];

  const navItems = userRole === "support" ? supportNavItems : clientNavItems;

  return (
    <div className="w-[250px] h-full bg-white border-r flex flex-col">
      {/* User Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={userAvatar}
              alt={userName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {userRole}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            if (item.submenu) {
              return (
                <li key={index}>
                  <Collapsible
                    open={openMenus[item.name.toLowerCase()]}
                    onOpenChange={() => toggleMenu(item.name.toLowerCase())}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between font-normal h-10"
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </div>
                        {openMenus[item.name.toLowerCase()] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-10 pr-2 space-y-1 pt-1">
                      {item.submenuItems?.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={cn(
                            "flex items-center h-8 text-sm rounded-md px-2 py-1.5 transition-colors",
                            isActive(subItem.path)
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              );
            }

            return (
              <li key={index}>
                <Link
                  to={item.path || "#"}
                  className={cn(
                    "flex items-center h-10 rounded-md px-3 py-2 transition-colors",
                    isActive(item.path || "")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t mt-auto">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
