"use client";

import { useState } from "react";
import { format, isSameDay } from "date-fns";
import { lt } from "date-fns/locale";
import {
  Calendar,
  Clock,
  Edit2,
  MapPin,
  Plus,
  Trash2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Sample data for appointments
const initialAppointments = [
  {
    id: "1",
    client: "Jessica Taylor",
    service: "Kirpimas ir šukuosena",
    date: new Date(2025, 3, 15, 14, 0), // April 15, 2025, 2:00 PM
    duration: 60, // minutes
    worker: "Emma Johnson",
    notes:
      "Klientė pageidauja trumpinti plaukus 5 cm ir padaryti lengvas bangas.",
    status: "confirmed",
  },
  {
    id: "2",
    client: "Marcus Lee",
    service: "Dažymas ir šviesinamosios sruogos",
    date: new Date(2025, 3, 15, 10, 0), // April 15, 2025, 10:00 AM
    duration: 120, // minutes
    worker: "Michael Chen",
    notes: "Pilnas dažymas, šviesi rusva spalva.",
    status: "confirmed",
  },
  {
    id: "3",
    client: "Olivia Parker",
    service: "Veido procedūros",
    date: new Date(2025, 3, 16, 11, 0), // April 16, 2025, 11:00 AM
    duration: 90, // minutes
    worker: "Sophia Rodriguez",
    notes: "Giluminis veido valymas ir drėkinamoji kaukė.",
    status: "confirmed",
  },
  {
    id: "4",
    client: "Daniel Wilson",
    service: "Manikiūras ir pedikiūras",
    date: new Date(2025, 3, 17, 15, 30), // April 17, 2025, 3:30 PM
    duration: 75, // minutes
    worker: "David Kim",
    notes: "Klasikinis manikiūras ir pedikiūras su gelinio lako padengimu.",
    status: "confirmed",
  },
  {
    id: "5",
    client: "Sophia Martinez",
    service: "Kirpimas ir šukuosena",
    date: new Date(2025, 3, 18, 9, 0), // April 18, 2025, 9:00 AM
    duration: 60, // minutes
    worker: "Emma Johnson",
    notes: "",
    status: "confirmed",
  },
  {
    id: "6",
    client: "Ethan Johnson",
    service: "Barzdos kirpimas ir formavimas",
    date: new Date(2025, 3, 18, 16, 0), // April 18, 2025, 4:00 PM
    duration: 45, // minutes
    worker: "James Taylor",
    notes: "Pirmasis apsilankymas, pageidauja trumpos barzdos formavimo.",
    status: "confirmed",
  },
  {
    id: "7",
    client: "Ava Williams",
    service: "Dažymas ir šviesinamosios sruogos",
    date: new Date(2025, 3, 19, 13, 0), // April 19, 2025, 1:00 PM
    duration: 150, // minutes
    worker: "Michael Chen",
    notes: "Balayage dažymas, nori natūralaus perėjimo iš tamsios į šviesią.",
    status: "confirmed",
  },
  {
    id: "8",
    client: "Noah Brown",
    service: "Kirpimas ir šukuosena",
    date: new Date(2025, 3, 20, 11, 30), // April 20, 2025, 11:30 AM
    duration: 45, // minutes
    worker: "Emma Johnson",
    notes: "",
    status: "confirmed",
  },
];

// Sample data for workers and services
const workers = [
  { id: "1", name: "Emma Johnson", role: "Vyriausioji stilistė" },
  { id: "2", name: "Michael Chen", role: "Spalvų specialistas" },
  { id: "3", name: "Sophia Rodriguez", role: "Kosmetologė" },
  { id: "4", name: "David Kim", role: "Nagų technikas" },
  { id: "5", name: "James Taylor", role: "Barber" },
];

const services = [
  { id: "1", name: "Kirpimas ir šukuosena", duration: 60, price: "45€+" },
  {
    id: "2",
    name: "Dažymas ir šviesinamosios sruogos",
    duration: 120,
    price: "85€+",
  },
  { id: "3", name: "Veido procedūros", duration: 90, price: "65€+" },
  { id: "4", name: "Manikiūras ir pedikiūras", duration: 75, price: "55€+" },
  {
    id: "5",
    name: "Barzdos kirpimas ir formavimas",
    duration: 45,
    price: "35€+",
  },
];

// Time slots for appointments
const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2); // Start at 9 AM
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

// Helper function to get appointment color based on service
const getAppointmentColor = (service: string) => {
  switch (service) {
    case "Kirpimas ir šukuosena":
      return "bg-blue-100 border-blue-300 text-blue-800";
    case "Dažymas ir šviesinamosios sruogos":
      return "bg-purple-100 border-purple-300 text-purple-800";
    case "Veido procedūros":
      return "bg-green-100 border-green-300 text-green-800";
    case "Manikiūras ir pedikiūras":
      return "bg-pink-100 border-pink-300 text-pink-800";
    case "Barzdos kirpimas ir formavimas":
      return "bg-amber-100 border-amber-300 text-amber-800";
    default:
      return "bg-gray-100 border-gray-300 text-gray-800";
  }
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
    null,
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState<any | null>(null);
  const [newAppointment, setNewAppointment] = useState({
    client: "",
    service: "",
    date: new Date(),
    time: "9:00",
    worker: "",
    notes: "",
  });

  // Filter appointments for the selected date
  const filteredAppointments = selectedDate
    ? appointments.filter((appointment) =>
        isSameDay(appointment.date, selectedDate),
      )
    : [];

  // Handle view appointment
  const handleViewAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsViewDialogOpen(true);
  };

  // Handle edit appointment
  const handleEditAppointment = () => {
    setIsViewDialogOpen(false);
    setEditedAppointment({
      ...selectedAppointment,
      time: format(selectedAppointment.date, "HH:mm"),
    });
    setIsEditDialogOpen(true);
  };

  // Handle save edited appointment
  const handleSaveEdit = () => {
    if (!editedAppointment) return;

    // Parse time string to create a new date
    const [hours, minutes] = editedAppointment.time.split(":").map(Number);
    const newDate = new Date(editedAppointment.date);
    newDate.setHours(hours, minutes, 0, 0);

    const updatedAppointment = {
      ...editedAppointment,
      date: newDate,
    };

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment,
      ),
    );

    setIsEditDialogOpen(false);
    toast("Rezervacija atnaujinta", {
      description: `${updatedAppointment.client} rezervacija sėkmingai atnaujinta.`,
    });
  };

  // Handle new appointment
  const handleNewAppointment = () => {
    setNewAppointment({
      client: "",
      service: "",
      date: selectedDate || new Date(),
      time: "9:00",
      worker: "",
      notes: "",
    });
    setIsNewDialogOpen(true);
  };

  // Handle save new appointment
  const handleSaveNew = () => {
    // Validate required fields
    if (
      !newAppointment.client ||
      !newAppointment.service ||
      !newAppointment.worker
    ) {
      toast.error("Trūksta informacijos", {
        description: "Prašome užpildyti visus būtinus laukus.",
      });
      return;
    }

    // Parse time string to create a new date
    const [hours, minutes] = newAppointment.time.split(":").map(Number);
    const appointmentDate = new Date(newAppointment.date);
    appointmentDate.setHours(hours, minutes, 0, 0);

    // Find service duration
    const serviceObj = services.find((s) => s.name === newAppointment.service);
    const duration = serviceObj ? serviceObj.duration : 60;

    const newAppointmentObj = {
      id: Date.now().toString(),
      client: newAppointment.client,
      service: newAppointment.service,
      date: appointmentDate,
      duration: duration,
      worker: newAppointment.worker,
      notes: newAppointment.notes,
      status: "confirmed",
    };

    setAppointments([...appointments, newAppointmentObj]);
    setIsNewDialogOpen(false);
    toast("Rezervacija sukurta", {
      description: `${newAppointment.client} rezervacija sėkmingai sukurta.`,
    });
  };

  // Handle delete appointment
  const handleDeleteAppointment = (id: string) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id),
    );
    setIsViewDialogOpen(false);
    toast("Rezervacija ištrinta", {
      description: "Rezervacija sėkmingai ištrinta.",
    });
  };

  // Generate time slots for the day view
  const dayViewTimeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 9 + i; // Start at 9 AM, end at 8 PM
    return {
      time: `${hour}:00`,
      displayTime: `${hour}:00`,
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Rezervacijų valdymas
        </h1>
        <p className="text-muted-foreground">
          Peržiūrėkite ir valdykite klientų rezervacijas.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Button onClick={handleNewAppointment}>
          <Plus className="mr-2 h-4 w-4" />
          Nauja rezervacija
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        {/* Calendar sidebar */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                locale={lt}
              />
            </div>
          </div>

          {/* Mini appointments list */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4">
              <h3 className="font-medium mb-3">Šiandienos rezervacijos</h3>
              <div className="space-y-2">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-2 rounded-md border cursor-pointer hover:bg-muted"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        <div>
                          <p className="font-medium">{appointment.client}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(appointment.date, "HH:mm")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{appointment.service}</p>
                          <p className="text-xs text-muted-foreground">
                            {appointment.worker}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nėra rezervacijų pasirinktai dienai
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main calendar view */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {selectedDate
                  ? format(selectedDate, "yyyy MMMM d, EEEE", { locale: lt })
                  : "Rezervacijos"}
              </h2>
            </div>

            {/* Day view with time slots */}
            <div className="relative min-h-[600px] border rounded-md">
              {/* Time indicators */}
              <div className="absolute top-0 left-0 w-16 h-full border-r bg-muted/20">
                {dayViewTimeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="h-20 flex items-start justify-center pt-1 text-xs text-muted-foreground border-b"
                  >
                    {slot.displayTime}
                  </div>
                ))}
              </div>

              {/* Appointments area */}
              <div className="ml-16 relative">
                {/* Hour grid lines */}
                {dayViewTimeSlots.map((_, index) => (
                  <div
                    key={index}
                    className="h-20 border-b last:border-b-0"
                  ></div>
                ))}

                {/* Appointment boxes */}
                {filteredAppointments.map((appointment) => {
                  const startHour = appointment.date.getHours();
                  const startMinute = appointment.date.getMinutes();
                  const durationInHours = appointment.duration / 60;

                  // Calculate position and height
                  const startPosition =
                    (startHour - 9) * 80 + (startMinute / 60) * 80; // 80px per hour
                  const height = durationInHours * 80;

                  return (
                    <div
                      key={appointment.id}
                      className={`absolute rounded-md border p-2 cursor-pointer transition-all hover:shadow-md ${getAppointmentColor(
                        appointment.service,
                      )}`}
                      style={{
                        top: `${startPosition}px`,
                        height: `${height}px`,
                        left: "8px",
                        right: "8px",
                      }}
                      onClick={() => handleViewAppointment(appointment)}
                    >
                      <div className="flex flex-col h-full overflow-hidden">
                        <p className="font-medium truncate">
                          {appointment.client}
                        </p>
                        <p className="text-xs truncate">
                          {appointment.service}
                        </p>
                        <p className="text-xs mt-auto truncate">
                          {format(appointment.date, "HH:mm")} -{" "}
                          {appointment.worker}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Appointment Dialog */}
      {selectedAppointment && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Rezervacijos informacija</DialogTitle>
              <DialogDescription>
                Peržiūrėkite rezervacijos detales.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{selectedAppointment.client}</p>
                  <p className="text-sm text-muted-foreground">Klientas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {format(selectedAppointment.date, "yyyy-MM-dd HH:mm", {
                      locale: lt,
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Data ir laikas
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {selectedAppointment.duration} min.
                  </p>
                  <p className="text-sm text-muted-foreground">Trukmė</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{selectedAppointment.service}</p>
                  <p className="text-sm text-muted-foreground">Paslauga</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{selectedAppointment.worker}</p>
                  <p className="text-sm text-muted-foreground">Darbuotojas</p>
                </div>
              </div>
              {selectedAppointment.notes && (
                <div className="pt-2">
                  <p className="text-sm font-medium">Pastabos:</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button
                variant="destructive"
                onClick={() => handleDeleteAppointment(selectedAppointment.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Ištrinti
              </Button>
              <Button onClick={handleEditAppointment}>
                <Edit2 className="mr-2 h-4 w-4" />
                Redaguoti
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Appointment Dialog */}
      {editedAppointment && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Redaguoti rezervaciją</DialogTitle>
              <DialogDescription>
                Atnaujinkite rezervacijos informaciją.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-client">Klientas</Label>
                <Input
                  id="edit-client"
                  value={editedAppointment.client}
                  onChange={(e) =>
                    setEditedAppointment({
                      ...editedAppointment,
                      client: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        id="edit-date"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(editedAppointment.date, "yyyy-MM-dd")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={editedAppointment.date}
                        onSelect={(date) =>
                          setEditedAppointment({
                            ...editedAppointment,
                            date: date || editedAppointment.date,
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Laikas</Label>
                  <Select
                    value={editedAppointment.time}
                    onValueChange={(value) =>
                      setEditedAppointment({
                        ...editedAppointment,
                        time: value,
                      })
                    }
                  >
                    <SelectTrigger id="edit-time">
                      <SelectValue placeholder="Pasirinkite laiką" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-service">Paslauga</Label>
                <Select
                  value={editedAppointment.service}
                  onValueChange={(value) =>
                    setEditedAppointment({
                      ...editedAppointment,
                      service: value,
                    })
                  }
                >
                  <SelectTrigger id="edit-service">
                    <SelectValue placeholder="Pasirinkite paslaugą" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name} ({service.duration} min.)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-worker">Darbuotojas</Label>
                <Select
                  value={editedAppointment.worker}
                  onValueChange={(value) =>
                    setEditedAppointment({
                      ...editedAppointment,
                      worker: value,
                    })
                  }
                >
                  <SelectTrigger id="edit-worker">
                    <SelectValue placeholder="Pasirinkite darbuotoją" />
                  </SelectTrigger>
                  <SelectContent>
                    {workers.map((worker) => (
                      <SelectItem key={worker.id} value={worker.name}>
                        {worker.name} - {worker.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Pastabos</Label>
                <Textarea
                  id="edit-notes"
                  value={editedAppointment.notes}
                  onChange={(e) =>
                    setEditedAppointment({
                      ...editedAppointment,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Papildoma informacija apie rezervaciją"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Atšaukti
              </Button>
              <Button onClick={handleSaveEdit}>Išsaugoti pakeitimus</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* New Appointment Dialog */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nauja rezervacija</DialogTitle>
            <DialogDescription>
              Sukurkite naują kliento rezervaciją.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-client">Klientas</Label>
              <Input
                id="new-client"
                value={newAppointment.client}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    client: e.target.value,
                  })
                }
                placeholder="Kliento vardas ir pavardė"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-date">Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="new-date"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(newAppointment.date, "yyyy-MM-dd")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={newAppointment.date}
                      onSelect={(date) =>
                        setNewAppointment({
                          ...newAppointment,
                          date: date || newAppointment.date,
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-time">Laikas</Label>
                <Select
                  value={newAppointment.time}
                  onValueChange={(value) =>
                    setNewAppointment({ ...newAppointment, time: value })
                  }
                >
                  <SelectTrigger id="new-time">
                    <SelectValue placeholder="Pasirinkite laiką" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-service">Paslauga</Label>
              <Select
                value={newAppointment.service}
                onValueChange={(value) =>
                  setNewAppointment({ ...newAppointment, service: value })
                }
              >
                <SelectTrigger id="new-service">
                  <SelectValue placeholder="Pasirinkite paslaugą" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.name}>
                      {service.name} ({service.duration} min.)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-worker">Darbuotojas</Label>
              <Select
                value={newAppointment.worker}
                onValueChange={(value) =>
                  setNewAppointment({ ...newAppointment, worker: value })
                }
              >
                <SelectTrigger id="new-worker">
                  <SelectValue placeholder="Pasirinkite darbuotoją" />
                </SelectTrigger>
                <SelectContent>
                  {workers.map((worker) => (
                    <SelectItem key={worker.id} value={worker.name}>
                      {worker.name} - {worker.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-notes">Pastabos</Label>
              <Textarea
                id="new-notes"
                value={newAppointment.notes}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    notes: e.target.value,
                  })
                }
                placeholder="Papildoma informacija apie rezervaciją"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewDialogOpen(false)}>
              Atšaukti
            </Button>
            <Button onClick={handleSaveNew}>Sukurti rezervaciją</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
