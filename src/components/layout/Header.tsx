import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, HelpCircle, Menu, Search, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  unreadNotifications?: number;
  onMenuToggle?: () => void;
}

const Header = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  unreadNotifications = 3,
  onMenuToggle = () => {},
}: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="font-bold text-xl text-primary">HelpDesk</div>
          <div className="hidden md:block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Support Portal
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6 mx-4">
        <Link
          to="/dashboard"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/tickets"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Tickets
        </Link>
        <Link
          to="/clients"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Clients
        </Link>
        <Link
          to="/reports"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Reports
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* Search Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Help Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help & Resources</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Notifications */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 ml-2"
            >
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">Support Agent</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search Overlay - could be expanded in a real implementation */}
      {searchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-md z-10">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tickets, clients, or knowledge base..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1.5"
              onClick={() => setSearchOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
