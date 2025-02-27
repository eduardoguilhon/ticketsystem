import React, { useState } from "react";
import { Bell, X, Check, Clock, AlertCircle, Info } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "ticket_update" | "ticket_assigned" | "ticket_resolved" | "system";
  ticketId?: string;
  sender?: {
    name: string;
    avatar?: string;
  };
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
  onNotificationClick?: (notification: Notification) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const NotificationCenter = ({
  notifications = [
    {
      id: "1",
      title: "Ticket Updated",
      message: "Jane Smith replied to ticket TKT-1234",
      timestamp: "2023-06-16T10:30:00Z",
      read: false,
      type: "ticket_update",
      ticketId: "TKT-1234",
      sender: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
    },
    {
      id: "2",
      title: "Ticket Assigned",
      message: "You have been assigned ticket TKT-5678",
      timestamp: "2023-06-15T14:45:00Z",
      read: false,
      type: "ticket_assigned",
      ticketId: "TKT-5678",
      sender: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
    },
    {
      id: "3",
      title: "Ticket Resolved",
      message: "Ticket TKT-9012 has been marked as resolved",
      timestamp: "2023-06-14T09:15:00Z",
      read: true,
      type: "ticket_resolved",
      ticketId: "TKT-9012",
    },
    {
      id: "4",
      title: "System Maintenance",
      message:
        "Scheduled maintenance on June 20, 2023 from 2:00 AM to 4:00 AM UTC",
      timestamp: "2023-06-13T11:20:00Z",
      read: true,
      type: "system",
    },
    {
      id: "5",
      title: "Ticket Updated",
      message: "New attachment added to ticket TKT-3456",
      timestamp: "2023-06-12T16:30:00Z",
      read: true,
      type: "ticket_update",
      ticketId: "TKT-3456",
      sender: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
    },
  ],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onClearAll = () => {},
  onNotificationClick = () => {},
  isOpen = true,
  onClose = () => {},
}: NotificationCenterProps) => {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "ticket_update":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "ticket_assigned":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "ticket_resolved":
        return <Check className="h-4 w-4 text-green-500" />;
      case "system":
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notification) => !notification.read);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full px-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-sm font-medium ${filter === "all" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${filter === "unread" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setFilter("unread")}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      {/* Notification List */}
      <ScrollArea className="flex-1">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? "bg-blue-50/30" : ""}`}
                onClick={() => onNotificationClick(notification)}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {notification.sender ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={notification.sender.avatar}
                          alt={notification.sender.name}
                        />
                        <AvatarFallback>
                          {notification.sender.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p
                        className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    {notification.ticketId && (
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          {notification.ticketId}
                        </Badge>
                      </div>
                    )}
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-6 text-xs text-blue-600 hover:text-blue-800 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead(notification.id);
                        }}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Bell className="h-12 w-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No notifications
            </h3>
            <p className="text-sm text-gray-500">
              {filter === "all"
                ? "You don't have any notifications yet."
                : "You don't have any unread notifications."}
            </p>
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      {filteredNotifications.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            disabled={!notifications.some((n) => !n.read)}
          >
            Mark all as read
          </Button>
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
