"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  MoreHorizontal,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";

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
import placeholderProfileImg from "@/assets/placeholder_profile.jpg";
import supabase from "@/lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setWorkers } from "@/store/userSlice";

// interface EditWorker extends Omit<Worker, "id"> {
//   id?: string;
// }

export default function WorkersPage() {
  const { user, workers } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (user && !workers.length) {
      supabase
        .from("workers")
        .select("*")
        .in("id", user.worker_ids)
        .then(({ data }) => {
          dispatch(setWorkers(data || []));
        });
    }
  }, [user, workers]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Darbuotojų valdymas
        </h1>
        <p className="text-muted-foreground">
          Valdykite savo komandą, sekite rezultatus ir priskirkite paslaugas.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Ieškoti darbuotojų..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Pridėti naują darbuotoją
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Vardas</TableHead>
              <TableHead>Kontaktai</TableHead>
              <TableHead>Klientai</TableHead>
              <TableHead>Pajamos</TableHead>
              <TableHead>Reitingas</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>{worker.id}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src={worker.photo || placeholderProfileImg}
                        alt={worker.name}
                        className="object-cover"
                      />
                    </div>
                    {worker.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{worker.contact}</span>
                  </div>
                </TableCell>
                <TableCell>{worker.clients}</TableCell>
                <TableCell>€ {worker.revenue}</TableCell>
                <TableCell>{worker.rating}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Atidaryti meniu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Veiksmai</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Peržiūrėti rezultatus
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Pašalinti darbuotoją
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
