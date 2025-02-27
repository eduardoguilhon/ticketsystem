import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock, UserCircle } from "lucide-react";

interface QuickActionsProps {
  actions?: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }>;
}

const QuickActions = ({ actions }: QuickActionsProps) => {
  const defaultActions = [
    {
      id: "new-ticket",
      title: "Create New Ticket",
      description: "Report a new issue or request support",
      icon: <PlusCircle className="h-8 w-8 text-primary" />,
      onClick: () => console.log("Create new ticket clicked"),
    },
    {
      id: "recent-tickets",
      title: "View Recent Tickets",
      description: "Check the status of your recent support requests",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      onClick: () => console.log("View recent tickets clicked"),
    },
    {
      id: "update-profile",
      title: "Update Profile",
      description: "Manage your account information and preferences",
      icon: <UserCircle className="h-8 w-8 text-green-500" />,
      onClick: () => console.log("Update profile clicked"),
    },
  ];

  const displayActions = actions || defaultActions;

  return (
    <div className="w-full bg-background p-4 space-y-6">
      <h2 className="text-2xl font-bold">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayActions.map((action) => (
          <Card
            key={action.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{action.title}</CardTitle>
                <div className="mt-1">{action.icon}</div>
              </div>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              {/* Additional content can be added here if needed */}
            </CardContent>
            <CardFooter>
              <Button onClick={action.onClick} className="w-full">
                {action.title.split(" ")[0]}{" "}
                {/* Use first word of title as button text */}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
