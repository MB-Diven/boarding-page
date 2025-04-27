"use client";

import { useState } from "react";
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

// Sample worker data
const initialWorkers = [
  {
    id: "1",
    name: "Emma Johnson",
    role: "Vyriausioji stilistė",
    email: "emma.johnson@example.com",
    phone: "(555) 123-4567",
    clients: 48,
    revenue: 3240,
    performance: "Excellent",
    services: ["Kirpimas ir šukuosena", "Dažymas ir šviesinamosios sruogos"],
    bio: "Turėdama daugiau nei 10 metų patirties, Emma specializuojasi tiksliuose kirpimuose ir spalvų transformacijose.",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Spalvų specialistas",
    email: "michael.chen@example.com",
    phone: "(555) 234-5678",
    clients: 42,
    revenue: 2830,
    performance: "Excellent",
    services: ["Dažymas ir šviesinamosios sruogos"],
    bio: "Michael žinomas dėl savo kūrybiškų spalvų technikų ir dėmesio detalėms.",
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    role: "Kosmetologė",
    email: "sophia.rodriguez@example.com",
    phone: "(555) 345-6789",
    clients: 36,
    revenue: 2125,
    performance: "Good",
    services: ["Veido procedūros"],
    bio: "Sophia teikia išskirtines odos priežiūros procedūras, daugiausia dėmesio skirdama natūraliems ingredientams.",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Nagų technikas",
    email: "david.kim@example.com",
    phone: "(555) 456-7890",
    clients: 32,
    revenue: 1980,
    performance: "Good",
    services: ["Manikiūras ir pedikiūras"],
    bio: "David kuria nuostabų nagų meną ir teikia atpalaiduojančias manikiūro ir pedikiūro paslaugas.",
  },
  {
    id: "5",
    name: "Olivia Wilson",
    role: "Junior stilistė",
    email: "olivia.wilson@example.com",
    phone: "(555) 567-8901",
    clients: 28,
    revenue: 1740,
    performance: "Average",
    services: ["Kirpimas ir šukuosena"],
    bio: "Olivia yra talentinga stilistė, kuri neseniai prisijungė prie mūsų komandos ir jau spėjo pelnyti klientų simpatijas.",
  },
  {
    id: "6",
    name: "James Taylor",
    role: "Barber",
    email: "james.taylor@example.com",
    phone: "(555) 678-9012",
    clients: 30,
    revenue: 1850,
    performance: "Good",
    services: ["Barzdos kirpimas ir formavimas", "Kirpimas ir šukuosena"],
    bio: "James specializuojasi vyrų kirpimuose ir barzdų formavime, turi daugiau nei 5 metų patirtį.",
  },
];

// Performance levels

interface Worker {
  id: string;
  name: string;
  role: string;
  email: string;
  clients: number;
  revenue: number;
  performance: string;
  phone: string;
  services: string[];
  bio: string;
  photo?: string;
}

// interface EditWorker extends Omit<Worker, "id"> {
//   id?: string;
// }

export default function WorkersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [workers, _] = useState<Worker[]>(initialWorkers);

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
              <TableHead>Vardas</TableHead>
              <TableHead>Pareigos</TableHead>
              <TableHead>Kontaktai</TableHead>
              <TableHead>Klientai</TableHead>
              <TableHead>Pajamos</TableHead>
              <TableHead>Rezultatai</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkers.map((worker) => (
              <TableRow key={worker.id}>
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
                <TableCell>{worker.role}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{worker.email}</span>
                    <span className="text-xs text-muted-foreground">
                      {worker.phone}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{worker.clients}</TableCell>
                <TableCell>€ {worker.revenue}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      worker.performance === "Excellent"
                        ? "bg-emerald-100 text-emerald-800"
                        : worker.performance === "Good"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {worker.performance}
                  </span>
                </TableCell>
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
