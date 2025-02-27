import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TicketFilterBarProps {
  onFilterChange?: (filters: {
    status?: string;
    priority?: string;
    client?: string;
    search?: string;
  }) => void;
}

const TicketFilterBar = ({
  onFilterChange = () => {},
}: TicketFilterBarProps) => {
  // Mock data for dropdowns
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "open", label: "Open" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];

  const clientOptions = [
    { value: "all", label: "All Clients" },
    { value: "acme-corp", label: "Acme Corporation" },
    { value: "globex", label: "Globex Industries" },
    { value: "initech", label: "Initech" },
    { value: "umbrella", label: "Umbrella Corp" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ status: value });
  };

  const handlePriorityChange = (value: string) => {
    onFilterChange({ priority: value });
  };

  const handleClientChange = (value: string) => {
    onFilterChange({ client: value });
  };

  return (
    <div className="w-full h-20 bg-background border-b flex items-center px-6 py-4 gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tickets..."
          className="pl-10"
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex items-center gap-3">
        <Select onValueChange={handleStatusChange} defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handlePriorityChange} defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleClientChange} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Client" />
          </SelectTrigger>
          <SelectContent>
            {clientOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  );
};

export default TicketFilterBar;
