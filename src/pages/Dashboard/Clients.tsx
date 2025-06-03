import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import supabase from "@/lib/supabase";
import { Client, setClients } from "@/store/userSlice";

export default function ClientsPage() {
  const { user, clients } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients?.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery),
  );

  useEffect(() => {
    if (user && !clients) {
      supabase
        .from("people")
        .select("*")
        .eq("client_id", user.id)
        .then(({ data, count }) => {
          dispatch(setClients(data as Client[]));
        });
    }
  }, [user, clients]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Klientų valdymas</h1>
        <p className="text-muted-foreground">
          Žiūrėk ir valdyk savo turimus klientus, redaguok ir rezervuok naujus
          vizitus
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Ieškoti kleintų..."
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
              <TableHead>Vardas</TableHead>
              <TableHead>El.paštas</TableHead>
              <TableHead>Tel. nr</TableHead>
              <TableHead>Paskutinis vizitas</TableHead>
              <TableHead>Bendrai išleista</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(filteredClients ?? []).map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.last_visit}</TableCell>
                <TableCell>{client.total_spent}</TableCell>
                {/* <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      client.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {client.status}
                  </span>
                </TableCell> */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Veiksmų menių</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Veiksmai</DropdownMenuLabel>
                      <DropdownMenuItem>Rodyt detaliau</DropdownMenuItem>
                      <DropdownMenuItem>Keisti klientą</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Rezervuoti vizitą
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Ištrinti klientą
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
