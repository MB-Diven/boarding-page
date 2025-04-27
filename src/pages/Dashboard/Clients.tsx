import { useState } from "react";
import { Calendar, MoreHorizontal, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample client data
const clients = [
  {
    id: "1",
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    phone: "(555) 123-4567",
    lastVisit: "Mar 15, 2025",
    totalSpent: "$345.00",
    status: "Active",
  },
  {
    id: "2",
    name: "Marcus Lee",
    email: "marcus.lee@example.com",
    phone: "(555) 234-5678",
    lastVisit: "Mar 10, 2025",
    totalSpent: "$520.00",
    status: "Active",
  },
  {
    id: "3",
    name: "Olivia Parker",
    email: "olivia.parker@example.com",
    phone: "(555) 345-6789",
    lastVisit: "Feb 28, 2025",
    totalSpent: "$210.00",
    status: "Active",
  },
  {
    id: "4",
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    phone: "(555) 456-7890",
    lastVisit: "Feb 22, 2025",
    totalSpent: "$175.00",
    status: "Inactive",
  },
  {
    id: "5",
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "(555) 567-8901",
    lastVisit: "Feb 18, 2025",
    totalSpent: "$430.00",
    status: "Active",
  },
  {
    id: "6",
    name: "Ethan Johnson",
    email: "ethan.johnson@example.com",
    phone: "(555) 678-9012",
    lastVisit: "Feb 12, 2025",
    totalSpent: "$290.00",
    status: "Active",
  },
  {
    id: "7",
    name: "Ava Williams",
    email: "ava.williams@example.com",
    phone: "(555) 789-0123",
    lastVisit: "Feb 5, 2025",
    totalSpent: "$380.00",
    status: "Active",
  },
  {
    id: "8",
    name: "Noah Brown",
    email: "noah.brown@example.com",
    phone: "(555) 890-1234",
    lastVisit: "Jan 30, 2025",
    totalSpent: "$155.00",
    status: "Inactive",
  },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
        <p className="text-muted-foreground">
          View and manage your client information, appointments, and history.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.lastVisit}</TableCell>
                <TableCell>{client.totalSpent}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      client.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {client.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit client</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Book appointment
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete client
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
