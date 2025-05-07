import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    // Extract userId from query parameters
    const userId = new URLSearchParams(req.url.split("?")[1]).get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Query Supabase for active subscriptions
    const { data: subscriptions, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("clerk_id", userId)
      .in("status", ["active", "trialing"])
      .order("created", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }

    if (subscriptions && subscriptions.length > 0) {
      return NextResponse.json(
        {
          hasActiveSubscription: true,
          subscription: subscriptions[0],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        hasActiveSubscription: false,
        message: "No active subscription found",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription check error:", error);
    return NextResponse.json(
      {
        message: "Error checking subscription status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
