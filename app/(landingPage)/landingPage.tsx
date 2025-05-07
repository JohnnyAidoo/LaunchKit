"use client";
import { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import { Zap, Shield, Globe, ArrowRight } from "lucide-react";
import Footer from "../../components/footer";
import Pricing from "../../components/pricing";
import Link from "next/link";
import Image from "next/image";

// Define features data - customizable for any startup
const features = [
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Lightning Fast",
    description:
      "Our platform delivers exceptional performance with optimized algorithms and efficient architecture.",
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Global Reach",
    description:
      "Connect with users worldwide with our multi-language support and global infrastructure.",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Enterprise Security",
    description:
      "Rest easy knowing your data is protected with industry-leading security protocols and encryption.",
  },
];

// Define FAQ data - customizable for any startup
const faqs = [
  {
    question: "How does your platform work?",
    answer:
      "Our platform uses cutting-edge technology to deliver a seamless experience. Simply sign up, configure your preferences, and start using our services immediately.",
  },
  {
    question: "What pricing plans do you offer?",
    answer:
      "We offer flexible pricing plans including a free tier for basic usage, and premium tiers with additional features for growing businesses and enterprises.",
  },
  {
    question: "Is there a trial period available?",
    answer:
      "Yes, we offer a 14-day free trial on all our premium plans with no credit card required. Experience all features before making a commitment.",
  },
  {
    question: "How can I get support?",
    answer:
      "Our dedicated support team is available 24/7 through live chat, email, and phone. Premium users also get access to priority support channels.",
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
          {process.env.NEXT_PUBLIC_BASE_NAME} - Innovative Solutions
        </title>
        <meta
          name="description"
          content="Transform your business with our innovative platform. Streamline operations, boost productivity, and scale with confidence."
        />
        <meta
          name="keywords"
          content="startup, innovation, technology, business solution, digital transformation"
        />
        <meta
          property="og:title"
          content={`${process.env.NEXT_PUBLIC_BASE_NAME} - Innovative Solutions`}
        />
        <meta
          property="og:description"
          content="Empower your business with our cutting-edge platform designed for growth and efficiency."
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
            Elevate Your Business
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 sm:mb-8 px-0 sm:px-4 md:px-10 lg:px-20">
            {process.env.NEXT_PUBLIC_BASE_NAME} provides innovative solutions to
            help your business grow, optimize operations, and stay ahead of the
            competition in today's digital landscape.
          </p>
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-lg w-full max-w-md"
              data-aos="fade-up"
            />
            <Link href="/sign-up" className="w-full sm:w-auto mt-2 sm:mt-0">
              <button className="btn btn-primary btn-lg w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
            data-aos="fade-up"
          >
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="card-title ml-4">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="card-actions justify-end mt-4">
                    <Link href="/features" className="btn btn-sm btn-ghost">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-12 sm:py-16 md:py-20 bg-base-200"
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
            data-aos="fade-up"
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="0">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Sign Up</h3>
              <p className="text-gray-500">
                Create your account in minutes and set up your profile with our
                easy onboarding process.
              </p>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Configure</h3>
              <p className="text-gray-500">
                Customize your workspace and settings to match your specific
                business requirements.
              </p>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Scale</h3>
              <p className="text-gray-500">
                Grow your business with our scalable solutions that adapt to
                your changing needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
            data-aos="fade-up"
          >
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-base-200 shadow-sm" data-aos="fade-up">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                        alt="Jane Doe"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Jane Doe</h3>
                    <p className="text-sm text-gray-500">CEO, TechCorp</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "This platform has transformed how we operate. We've seen a
                  40% increase in productivity since implementation."
                </p>
              </div>
            </div>
            <div
              className="card bg-base-200 shadow-sm"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                        alt="John Smith"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">John Smith</h3>
                    <p className="text-sm text-gray-500">CTO, InnovateCo</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The integration was seamless and the support team was
                  exceptional. Highly recommend for any growing business."
                </p>
              </div>
            </div>
            <div
              className="card bg-base-200 shadow-sm"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                        alt="Amy Lee"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Amy Lee</h3>
                    <p className="text-sm text-gray-500">Founder, StartupX</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "As a startup founder, I needed a solution that could grow
                  with us. This platform has been the perfect fit for our
                  evolving needs."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            Ready to Transform Your Business?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have already elevated their
            operations with our innovative platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-up">
              <button className="btn btn-primary btn-lg">Get Started</button>
            </Link>
            <Link href="/contact">
              <button className="btn btn-outline btn-lg">Contact Sales</button>
            </Link>
          </div>
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
            Designed with ♥ for innovative businesses worldwide.
          </p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
