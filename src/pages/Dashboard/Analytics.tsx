import { useState } from "react";
import { BarChart, PieChart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("month");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights into your business performance, worker productivity,
          and product popularity.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs value={period} onValueChange={setPeriod} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button variant="outline" size="sm">
            Print
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-normal">
              Revenue Breakdown
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
              Revenue Pie Chart
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-primary"></div>
                <span className="text-sm">Services (68%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-blue-400"></div>
                <span className="text-sm">Product Sales (24%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-emerald-400"></div>
                <span className="text-sm">Gift Cards (8%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-normal">
              Worker Performance
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
              Worker Performance Chart
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Emma Johnson</span>
                <span className="text-sm font-medium">$3,240</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Michael Chen</span>
                <span className="text-sm font-medium">$2,830</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sophia Rodriguez</span>
                <span className="text-sm font-medium">$2,125</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">David Kim</span>
                <span className="text-sm font-medium">$1,980</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-normal">
              Product Popularity
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
              Product Popularity Chart
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Premium Hair Serum</span>
                <span className="text-sm font-medium">32 sold</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hydrating Face Mask</span>
                <span className="text-sm font-medium">28 sold</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Volumizing Shampoo</span>
                <span className="text-sm font-medium">24 sold</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Nourishing Conditioner</span>
                <span className="text-sm font-medium">22 sold</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Track your revenue over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
            Revenue Trend Line Chart
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Popularity</CardTitle>
            <CardDescription>Most requested services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
              Service Popularity Chart
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span>Haircut & Styling</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "32%" }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Color & Highlights</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "28%" }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Facial Treatments</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "24%" }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Manicure & Pedicure</span>
                <span className="font-medium">16%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "16%" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Retention</CardTitle>
            <CardDescription>New vs. returning clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
              Client Retention Chart
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span>Returning Clients</span>
                  <span className="font-medium">72%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span>New Clients</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: "28%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
