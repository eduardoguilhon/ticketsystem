import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowLeft, MoreHorizontal, Clock, AlertCircle } from "lucide-react";

interface TicketHeaderProps {
  ticketId?: string;
  subject?: string;
  status?: "open" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high" | "urgent";
  onStatusChange?: (status: string) => void;
  onPriorityChange?: (priority: string) => void;
  onBack?: () => void;
}

const TicketHeader = ({
  ticketId = "TKT-1234",
  subject = "Unable to access admin dashboard after recent update",
  status = "open",
  priority = "medium",
  onStatusChange = () => {},
  onPriorityChange = () => {},
  onBack = () => {},
}: TicketHeaderProps) => {
  // Map status to badge colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-500">Open</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Map priority to badge colors
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="secondary" className="bg-slate-400">
            Low
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="secondary" className="bg-blue-400">
            Medium
          </Badge>
        );
      case "high":
        return (
          <Badge variant="secondary" className="bg-orange-400">
            High
          </Badge>
        );
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full p-4 border-b bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium text-gray-500">{ticketId}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Clock className="h-4 w-4" />
            <span>History</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Escalate</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">{subject}</h1>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <Select defaultValue={status} onValueChange={onStatusChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Priority:</span>
            <Select defaultValue={priority} onValueChange={onPriorityChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;
