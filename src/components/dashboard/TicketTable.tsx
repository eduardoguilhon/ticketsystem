import React, { useState } from "react";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Ticket {
  id: string;
  subject: string;
  client: string;
  status: "Open" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  assignedTo: string;
  createdDate: string;
}

interface TicketTableProps {
  tickets?: Ticket[];
  onViewTicket?: (id: string) => void;
  onEditTicket?: (id: string) => void;
  onDeleteTicket?: (id: string) => void;
}

const TicketTable = ({
  tickets = [
    {
      id: "TKT-001",
      subject: "Website not loading properly",
      client: "Acme Corp",
      status: "Open",
      priority: "High",
      assignedTo: "Jane Smith",
      createdDate: "2023-06-15",
    },
    {
      id: "TKT-002",
      subject: "Email configuration issue",
      client: "Globex Inc",
      status: "In Progress",
      priority: "Medium",
      assignedTo: "John Doe",
      createdDate: "2023-06-14",
    },
    {
      id: "TKT-003",
      subject: "Payment gateway error",
      client: "Wayne Enterprises",
      status: "Open",
      priority: "Urgent",
      assignedTo: "Unassigned",
      createdDate: "2023-06-16",
    },
    {
      id: "TKT-004",
      subject: "Database backup failure",
      client: "Stark Industries",
      status: "Completed",
      priority: "Medium",
      assignedTo: "Jane Smith",
      createdDate: "2023-06-10",
    },
    {
      id: "TKT-005",
      subject: "SSL certificate expired",
      client: "Oscorp",
      status: "Open",
      priority: "High",
      assignedTo: "John Doe",
      createdDate: "2023-06-16",
    },
  ],
  onViewTicket = () => {},
  onEditTicket = () => {},
  onDeleteTicket = () => {},
}: TicketTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // This would normally be calculated based on total tickets and page size

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Open":
        return "default";
      case "In Progress":
        return "secondary";
      case "Completed":
        return "outline";
      default:
        return "default";
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "Low":
        return "outline";
      case "Medium":
        return "secondary";
      case "High":
        return "default";
      case "Urgent":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{ticket.client}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(ticket.status)}>
                  {ticket.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getPriorityBadgeVariant(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>{ticket.assignedTo}</TableCell>
              <TableCell>{ticket.createdDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewTicket(ticket.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditTicket(ticket.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Ticket
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteTicket(ticket.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">5</span> of{" "}
          <span className="font-medium">25</span> tickets
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TicketTable;
