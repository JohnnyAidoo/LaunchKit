// app/components/SubscribeButton.tsx
"use client";

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";

export default function SubscribeButton(props: { priceId: string }) {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  const handleSubscribe = async () => {
    try {
      if (!isSignedIn) {
        // You could also add a redirect to the sign-in page here
        window.location.replace("/sign-in");
      }
      const { data } = await axios.post("/api/create-checkout-session", {
        email: user?.emailAddresses[0].emailAddress,
        priceId: props.priceId,
        userId: user?.id,
      });
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      const { error } = await stripe!.redirectToCheckout({
        sessionId: data.sessionId,
      });
      if (error) {
        console.error("Stripe checkout error", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <button onClick={handleSubscribe} className="btn btn-primary w-full">
      Subscribe
    </button>
  );
}
