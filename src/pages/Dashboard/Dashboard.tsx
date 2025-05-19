import {
  ArrowUpRight,
  Calendar,
  DollarSign,
  Package,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getReservationChangeFromPreviousMonth } from "@/lib/clients";
import supabase from "@/lib/supabase";

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const [totalRev, setTotalRev] = useState({
    sum: 0,
  });
  const [rezervations, setRezervationAnalytics] = useState({
    sum: "0",
    percentageChange: "0",
  });
  const [newClients, setNewClientsAnalytics] = useState({
    sum: "0",
    percentageChange: "0",
  });

  useEffect(() => {
    if (user) {
      getReservationChangeFromPreviousMonth(user, "rezervation").then(
        (data) => {
          if (data) {
            setRezervationAnalytics({
              sum: data.currentMonthCount.toString(),
              percentageChange:
                data.percentChange === "N/A" ? "0" : data.percentChange,
            });
          }
        },
      );

      getReservationChangeFromPreviousMonth(user, "people").then((data) => {
        if (data) {
          setNewClientsAnalytics({
            sum: data.currentMonthCount.toString(),
            percentageChange:
              data.percentChange === "N/A" ? "0" : data.percentChange,
          });
        }
      });

      let totalRev = 0;
      user.worker_ids.forEach((workerId) => {
        supabase
          .from("workers")
          .select("revenue")
          .eq("id", workerId)
          .single()
          .then(({ data }) => {
            totalRev += data?.revenue ?? 0;
          });
      });
      setTotalRev({ sum: totalRev });
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Valdymo skydas</h1>
        <p className="text-muted-foreground">
          Sveiki sugrįžę! Čia yra jūsų verslo veiklos apžvalga.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Bendras uždarbis
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRev.sum}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Nauji klientai
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newClients.sum}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">
                {newClients.percentageChange}%
              </span>{" "}
              nuo preito mėnesio
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Rezervacijos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rezervations.sum}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">
                {rezervations.percentageChange}%
              </span>{" "}
              nuo preito mėnesio
            </p>
          </CardContent>
        </Card>
        <Card className="opacity-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Produktų pardavimai
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500">+0%</span> nuo preito mėnesio
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>Latest client bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      client: "Jessica Taylor",
                      service: "Haircut & Styling",
                      date: "Today, 2:00 PM",
                      stylist: "Emma Johnson",
                    },
                    {
                      client: "Marcus Lee",
                      service: "Color & Highlights",
                      date: "Today, 4:30 PM",
                      stylist: "Michael Chen",
                    },
                    {
                      client: "Olivia Parker",
                      service: "Facial Treatment",
                      date: "Tomorrow, 10:00 AM",
                      stylist: "Sophia Rodriguez",
                    },
                    {
                      client: "Daniel Wilson",
                      service: "Manicure & Pedicure",
                      date: "Tomorrow, 1:30 PM",
                      stylist: "David Kim",
                    },
                  ].map((appointment, i) => (
                    <div key={i} className="flex items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        {appointment.client
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {appointment.client}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.service}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm">{appointment.date}</p>
                        <p className="text-xs text-muted-foreground">
                          with {appointment.stylist}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/dashboard/appointments">
                    View all appointments
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Your best workers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Emma Johnson",
                      role: "Senior Stylist",
                      revenue: "$3,240",
                      growth: "+18%",
                    },
                    {
                      name: "Michael Chen",
                      role: "Color Specialist",
                      revenue: "$2,830",
                      growth: "+12%",
                    },
                    {
                      name: "Sophia Rodriguez",
                      role: "Esthetician",
                      revenue: "$2,125",
                      growth: "+7%",
                    },
                  ].map((worker) => (
                    <div key={worker.name} className="flex items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        {worker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {worker.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {worker.role}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium">{worker.revenue}</p>
                        <p className="text-xs text-emerald-500">
                          {worker.growth}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Popular Products</CardTitle>
                <CardDescription>
                  Your best selling products this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Premium Hair Serum",
                      category: "Hair Care",
                      sales: 32,
                      growth: "+24%",
                    },
                    {
                      name: "Hydrating Face Mask",
                      category: "Skin Care",
                      sales: 28,
                      growth: "+16%",
                    },
                    {
                      name: "Volumizing Shampoo",
                      category: "Hair Care",
                      sales: 24,
                      growth: "+8%",
                    },
                  ].map((product) => (
                    <div key={product.name} className="flex items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.category}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium">
                          {product.sales} sold
                        </p>
                        <p className="text-xs text-emerald-500">
                          {product.growth}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[240px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  Revenue Chart
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed performance metrics for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                Analytics Dashboard Content
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Download and view business reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                Reports Dashboard Content
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
