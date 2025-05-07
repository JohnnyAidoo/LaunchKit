// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Webhook secret for verification
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    // Retrieve the raw request body as text for signature verification
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret or signature not found" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log(`🔔  Webhook received: ${event.type}`);
    } catch (err) {
      console.error("❌ Webhook signature verification failed.", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    try {
      switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          await updateSubscription(subscription);
          break;
        }
        case "checkout.session.completed": {
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            if (subscriptionId) {
              // Retrieve the full subscription details from Stripe
              const subscription = await stripe.subscriptions.retrieve(
                subscriptionId as string
              );
              // Extract email and Clerk ID from the checkout session (if provided)
              const email = checkoutSession.customer_details?.email;
              const clerkId = checkoutSession.metadata?.clerkId || "";
              await updateSubscription(
                subscription,
                email as string,
                clerkId || undefined
              );
            }
          }
          break;
        }
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.error("Error handling webhook event:", error);
      return NextResponse.json(
        {
          error: "Webhook handler failed",
          message: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        error: "Webhook handler failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Updates (or creates) a subscription record in Supabase.
 *
 * @param subscription Stripe.Subscription object
 * @param emailParam Optional email override (e.g., from checkout session)
 * @param clerkIdParam Optional Clerk ID to be saved.
 */
async function updateSubscription(
  subscription: Stripe.Subscription,
  emailParam?: string,
  clerkIdParam?: string
) {
  let email = emailParam || "";

  // If email is not provided, retrieve it from the Stripe Customer
  if (!email) {
    try {
      const customer = await stripe.customers.retrieve(
        subscription.customer as string
      );
      if (!("deleted" in customer) && typeof customer === "object") {
        email = customer.email || "";
      }
    } catch (err) {
      console.error("Error retrieving customer email", err);
    }
  }

  // Use provided clerkId parameter or fall back to subscription metadata if available
  const clerkId = clerkIdParam || subscription.metadata?.clerkId || "";

  // Prepare subscription data for Supabase
  const subscriptionData = {
    id: subscription.id,
    user_id: subscription.customer as string,
    clerk_id: clerkId,
    email: email,
    status: subscription.status,
    metadata: subscription.metadata,
    price_id: subscription.items.data[0]?.price.id,
    quantity: subscription.items.data[0]?.quantity || 1,
    cancel_at_period_end: subscription.cancel_at_period_end,
    created: new Date(subscription.created * 1000).toISOString(),
    current_period_start: new Date(
      subscription.current_period_start * 1000
    ).toISOString(),
    current_period_end: new Date(
      subscription.current_period_end * 1000
    ).toISOString(),
    ended_at: subscription.ended_at
      ? new Date(subscription.ended_at * 1000).toISOString()
      : null,
    cancel_at: subscription.cancel_at
      ? new Date(subscription.cancel_at * 1000).toISOString()
      : null,
    canceled_at: subscription.canceled_at
      ? new Date(subscription.canceled_at * 1000).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? new Date(subscription.trial_start * 1000).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? new Date(subscription.trial_end * 1000).toISOString()
      : null,
  };

  // Upsert subscription data to Supabase
  const { error, data } = await supabase
    .from("subscriptions")
    .upsert(subscriptionData, {
      onConflict: "id",
    });
  if (data) {
    return;
  }

  if (error) {
    console.error("Error upserting subscription:", error);
    throw new Error(
      `Failed to update subscription in Supabase: ${error.message}`
    );
  }

  console.log("Subscription updated in Supabase:", subscription.id);
}
