import { User } from "@/store/userSlice";
import supabase from "./supabase";
import { previousDay } from "date-fns";

// Get the change in new reservations comparing this month to previous month
export const getReservationChangeFromPreviousMonth = async (user: User) => {
  // Get date ranges
  const now = new Date();
  const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1,
  );

  // Format dates for Supabase query
  const currentMonthStart = firstDayCurrentMonth.toISOString();
  const previousMonthStart = firstDayPreviousMonth.toISOString();

  // Query for current month count
  const { error: currentMonthError, count: currentMonthCount } = await supabase
    .from("rezervation")
    .select("*", { count: "exact", head: true })
    .eq("client_id", user.id)
    .gte("created_at", currentMonthStart);

  // Query for previous month count
  const { error: previousMonthError, count: previousMonthCount } =
    await supabase
      .from("rezervation")
      .select("*", { count: "exact", head: true })
      .eq("client_id", user.id)
      .gte("created_at", previousMonthStart)
      .lt("created_at", currentMonthStart);

  if (currentMonthError || previousMonthError) {
    console.error(
      "Error fetching reservation counts:",
      currentMonthError || previousMonthError,
    );
    return null;
  }

  // Calculate change
  const change = (currentMonthCount ?? 0) - (previousMonthCount ?? 0);
  const percentChange =
    (previousMonthCount ?? 0) > 0
      ? (change / (previousMonthCount ?? 0)) * 100
      : null;

  return {
    currentMonthCount: currentMonthCount ?? 0,
    previousMonthCount: previousMonthCount ?? 0,
    change,
    percentChange:
      percentChange !== null ? `${percentChange.toFixed(2)}%` : "N/A",
    period: {
      currentMonth: `${firstDayCurrentMonth.toLocaleDateString()} to ${now.toLocaleDateString()}`,
      previousMonth: `${firstDayPreviousMonth.toLocaleDateString()} to ${firstDayCurrentMonth.toLocaleDateString()}`,
    },
  };
};
