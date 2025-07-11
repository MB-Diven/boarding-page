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
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getReservationChangeFromPreviousMonth } from "@/lib/clients";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const {
    user,
    workers: { totalRev },
  } = useSelector((state: RootState) => state.user);
  const calledData = useRef(false);
  const [rezervations, setRezervationAnalytics] = useState({
    sum: "0",
    percentageChange: "0",
  });
  const [newClients, setNewClientsAnalytics] = useState({
    sum: "0",
    percentageChange: "0",
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      if (!calledData.current) {
        getReservationChangeFromPreviousMonth(user, "rezervation").then(
          (data) => {
            if (data) {
              setRezervationAnalytics({
                sum: data.currentMonthCount.toString(),
                percentageChange:
                  data.percentChange === "N/A" ? "0" : data.percentChange,
              });
            }
          }
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

        calledData.current = true;
      }
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("dashboard.overview.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("dashboard.overview.welcome")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.overview.totalRevenue")}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRev}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.overview.newClients")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newClients.sum}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">
                {newClients.percentageChange}%
              </span>{" "}
              {t("dashboard.overview.fromLastMonth")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.overview.reservations")}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rezervations.sum}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">
                {rezervations.percentageChange}%
              </span>{" "}
              {t("dashboard.overview.fromLastMonth")}
            </p>
          </CardContent>
        </Card>
        <Card className="opacity-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.overview.productSales")}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500">+0%</span>{" "}
              {t("dashboard.overview.fromLastMonth")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            {t("dashboard.overview.overview")}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {t("dashboard.overview.analytics")}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {t("dashboard.overview.reports")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>
                  {t("dashboard.overview.recentAppointments")}
                </CardTitle>
                <CardDescription>
                  {t("dashboard.overview.latestBookings")}
                </CardDescription>
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
                          {t("dashboard.overview.with")} {appointment.stylist}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/dashboard/appointments">
                    {t("dashboard.overview.viewAllAppointments")}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>{t("dashboard.overview.topPerformers")}</CardTitle>
                <CardDescription>
                  {t("dashboard.overview.bestWorkers")}
                </CardDescription>
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
                <CardTitle>{t("dashboard.overview.popularProducts")}</CardTitle>
                <CardDescription>
                  {t("dashboard.overview.bestSelling")}
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
                          {product.sales} {t("dashboard.overview.sold")}
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
                <CardTitle>{t("dashboard.overview.revenueOverview")}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[240px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  {t("dashboard.overview.revenueChart")}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.overview.analyticsTitle")}</CardTitle>
              <CardDescription>
                {t("dashboard.overview.analyticsDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                {t("dashboard.overview.analyticsDashboard")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.overview.reportsTitle")}</CardTitle>
              <CardDescription>
                {t("dashboard.overview.reportsDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                {t("dashboard.overview.reportsDashboard")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
