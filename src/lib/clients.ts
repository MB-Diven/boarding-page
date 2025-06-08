import { User } from "@/store/userSlice";
import supabase from "./supabase";

// Get the change in new reservations comparing this month to previous month
export const getReservationChangeFromPreviousMonth = async (
  user: User,
  table: string
) => {
  // Get date ranges
  const now = new Date();
  const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  // Format dates for Supabase query
  const currentMonthStart = firstDayCurrentMonth.toISOString();
  const previousMonthStart = firstDayPreviousMonth.toISOString();

  // Create cache keys
  const currentMonthCacheKey = `${table}_${user.id}_${currentMonthStart}`;
  const previousMonthCacheKey = `${table}_${user.id}_${previousMonthStart}_${currentMonthStart}`;

  // Try to get from cache first
  let currentMonthCount = localStorage.getItem(currentMonthCacheKey);
  let previousMonthCount = localStorage.getItem(previousMonthCacheKey);

  // If not in cache, fetch from Supabase
  if (!currentMonthCount) {
    const { error: currentMonthError, count } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("client_id", user.id)
      .gte("created_at", currentMonthStart);

    if (currentMonthError) {
      console.error("Error fetching current month count:", currentMonthError);
      return null;
    }

    currentMonthCount = count?.toString() || "0";
    localStorage.setItem(currentMonthCacheKey, currentMonthCount || "0");
  }

  if (!previousMonthCount) {
    const { error: previousMonthError, count } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("client_id", user.id)
      .gte("created_at", previousMonthStart)
      .lt("created_at", currentMonthStart);

    if (previousMonthError) {
      console.error("Error fetching previous month count:", previousMonthError);
      return null;
    }

    previousMonthCount = count?.toString() || "0";
    localStorage.setItem(previousMonthCacheKey, previousMonthCount || "0");
  }

  // Parse counts from cache
  const currentCount = parseInt(currentMonthCount || "0");
  const previousCount = parseInt(previousMonthCount || "0");

  // Calculate change
  const change = currentCount - previousCount;
  const percentChange =
    previousCount > 0 ? (change / previousCount) * 100 : null;

  return {
    currentMonthCount: currentCount,
    previousMonthCount: previousCount,
    change,
    percentChange:
      percentChange !== null ? `${percentChange.toFixed(2)}%` : "N/A",
    period: {
      currentMonth: `${firstDayCurrentMonth.toLocaleDateString()} to ${now.toLocaleDateString()}`,
      previousMonth: `${firstDayPreviousMonth.toLocaleDateString()} to ${firstDayCurrentMonth.toLocaleDateString()}`,
    },
  };
};
