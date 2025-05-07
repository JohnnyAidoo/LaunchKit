"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SubscribeButton from "./SubscribeButton";

const Pricing = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: "Basic",
      description:
        "Perfect for moderate usage, offering substantial daily access to video chats.",
      price: isYearly ? "49.99" : "4.99",
      features: [
        "30 videos per day",
        "30 messages per video",
        "Process videos without transcripts (up to 30 minutes each)",
        "Priority email support",
        "Priority access to new features",
      ],
      duration: isYearly ? "yearly" : "monthly",
      priceId: isYearly
        ? "price_1RAKN2IxT6EdY6Zrh4Z5CANc"
        : "price_1RAKN2IxT6EdY6Zrw9N8nEqN",
    },
    {
      title: "Growth",
      description:
        "Unlock greater possibilities with expanded video chats and messaging capabilities.",
      price: isYearly ? "99.99" : "9.99",
      features: [
        "100 videos per day",
        "100 messages per video",
        "Process videos without transcripts (up to 30 minutes each)",
        "Priority email support",
        "Priority access to new features",
      ],
      duration: isYearly ? "yearly" : "monthly",
      priceId: isYearly
        ? "price_1RAKQyIxT6EdY6ZrqkGaUu0d"
        : "price_1RAKQyIxT6EdY6ZrsM4YuT8X",
    },
    {
      title: "Pro",
      description:
        "Open the door to infinite interactions with all-day, every-video chat access.",
      price: isYearly ? "129.99" : "12.99",
      features: [
        "unlimited videos per day",
        "unlimited messages per video",
        "Process videos without transcripts (up to 30 minutes each)",
        "Priority email support",
        "Priority access to new features",
      ],
      duration: isYearly ? "yearly" : "monthly",
      priceId: isYearly
        ? "price_1RAKTBIxT6EdY6ZrszKZTtRu"
        : "price_1RAKTBIxT6EdY6ZrtQjawRpX",
    },
  ];

  return (
    <section id="pricing" className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">
        Pricing Plans
      </h2>

      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div role="tablist" className="tabs tabs-lift">
            <button
              onClick={() => {
                setIsYearly(false);
              }}
              role="tab"
              className={`tab  ${isYearly == false ? "tab-active" : ""}`}
            >
              Monthly
            </button>
            <button
              onClick={() => {
                setIsYearly(true);
              }}
              role="tab"
              className={`tab  ${isYearly ? "tab-active" : ""}`}
            >
              Yearly{" "}
              <span className="pl-1 text-accent">(2 months discount)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            data-aos="slide-up"
            data-aos-delay={index * 100}
            key={index}
            className={`bg-base-200 rounded-lg shadow-xl p-8 card ${
              index === 1 ? "border-1 border-accent shadow-accent" : ""
            }`}
          >
            {index === 1 ? (
              <div className="w-full flex justify-end">
                <span className="badge badge-xs badge-accent ">
                  Most popular
                </span>
              </div>
            ) : null}
            <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
            <div className="flex items-center mb-4">
              <span className="text-4xl font-bold">${plan.price}</span>
              {isYearly && (
                <span className="text-md text-gray-500 ml-2 line-through">
                  {((Number(plan.price) % 10) + Number(plan.price)).toFixed(2)}
                </span>
              )}
              <span className="text-sm text-gray-500 ml-2">
                {plan.duration}
              </span>
            </div>
            <p className=" text-sm text-gray-500 mb-4">{plan.description}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <SubscribeButton priceId={plan.priceId} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
