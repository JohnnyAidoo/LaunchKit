"use client";
import { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import { MessageCircle, Shield, Zap, Globe } from "lucide-react";
import Footer from "../../components/footer";
import Pricing from "../../components/pricing";
import Link from "next/link";
import Image from "next/image";

// Define features data
const features = [
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Real-time AI Chat",
    description:
      "Engage with video content through intelligent conversations powered by advanced AI technology.",
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Multi-language Support",
    description:
      "Translate and understand content in multiple languages for global accessibility.",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Smart Summaries",
    description:
      "Get instant, accurate summaries of any YouTube video with key points highlighted.",
  },
];

// Define FAQ data
const faqs = [
  {
    question: "How does the AI chat feature work?",
    answer:
      "Our AI technology analyzes the video content in real-time, allowing you to ask questions and receive intelligent responses based on the video context.",
  },
  {
    question: "Is there a limit to video length?",
    answer:
      "We support videos of any length, though longer videos may take a few moments to process for optimal chat experience.",
  },
  {
    question: "Can I use this for any YouTube video?",
    answer:
      "Yes, our platform works with any public YouTube video. Simply paste the link and start chatting!",
  },
  {
    question: "What languages are supported?",
    answer:
      "We support multiple languages for both chat and translation, making content accessible globally.",
  },
];

function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_BASE_NAME} - Chat with YouTube Videos Using
          AI
        </title>
        <meta
          name="description"
          content="Transform your YouTube viewing experience with AI-powered chat. Get real-time summaries, translations, and engage with video content like never before."
        />
        <meta
          name="keywords"
          content="YouTube AI, video chat, AI translation, video summary, content analysis"
        />
        <meta
          property="og:title"
          content={`${process.env.NEXT_PUBLIC_BASE_NAME} - YouTube Video AI Chat`}
        />
        <meta
          property="og:description"
          content="Chat with YouTube videos using AI - get summaries, translations, and insights in real-time."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL} />
      </Head>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center py-8">
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-10 text-center"
          data-aos="fade-up"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Chat with any YouTube video
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 sm:mb-8 px-0 sm:px-4 md:px-10 lg:px-20">
            {process.env.NEXT_PUBLIC_BASE_NAME} allows you to chat with YouTube
            videos in real-time using AI - ask questions, get summaries,
            pinpoint key points, translate content, and so much more!
          </p>
          <div className="mb-8 w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
            <input
              type="text"
              placeholder="Paste your YouTube link here"
              className="input input-lg w-full max-w-2xl"
              data-aos="fade-up"
            />
            <Link
              href="/sign-in"
              className="w-full sm:w-auto sm:ml-4 mt-2 sm:mt-0"
            >
              <button className="btn btn-primary btn-lg w-full sm:w-auto">
                Chat <MessageCircle className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
            data-aos="fade-up"
          >
            Powerful Features
          </h2>
          <div className="w-full flex justify-center rounded-2xl mb-6 sm:mb-10">
            <Image
              src="/shot.png"
              alt="Logo"
              width={500}
              height={500}
              style={{ width: "100%", maxWidth: "800px" }}
              className="px-2 sm:px-0"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card-body p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 md:py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
            data-aos="fade-up"
          >
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-arrow bg-base-100"
                data-aos="fade-in"
              >
                <input type="checkbox" />
                <div className="collapse-title text-base sm:text-lg md:text-xl font-medium py-3 px-4">
                  {faq.question}
                </div>
                <div className="collapse-content px-4 text-sm sm:text-base">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-base-100">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
            Ready to Transform Your Video Experience?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
            Start chatting with YouTube videos today and unlock new
            possibilities.
          </p>
          <Link href={"/app"}>
            <button className="btn btn-primary btn-lg">Get Started Now</button>
          </Link>
        </div>
      </section>

      <Footer />

      {/* Copyright */}
      <div className="bg-neutral text-neutral-content py-4">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm">
          <p>
            © {currentYear} {process.env.NEXT_PUBLIC_BASE_NAME}. All rights
            reserved.
          </p>
          <p className="mt-2">
            YouTube™ is a trademark of Google LLC.{" "}
            {process.env.NEXT_PUBLIC_BASE_NAME} is not affiliated with or
            endorsed by YouTube or Google LLC.
          </p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
