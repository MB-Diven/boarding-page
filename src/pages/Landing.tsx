import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Laptop,
  Settings,
  ShoppingCart,
  Smartphone,
  Star,
  Users,
} from "lucide-react";
import HeroImage from "../assets/hero.svg";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-center">
              <div className="flex w-full max-w-lg flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Your Rental Business Website in Minutes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Diven helps you build a professional rental platform and
                    manage your inventory, bookings, and clients all in one
                    place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <a href="#">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#">Book a Demo</a>
                  </Button>
                </div>
                {/* <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  </div>
                  <div className="text-muted-foreground">
                    Trusted by over 2,000 rental businesses worldwide
                  </div>
                </div> */}
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-background">
                  <img
                    src={HeroImage}
                    alt="Product Preview"
                    className="object-cover w-full max-w-3xl h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything You Need to Run Your Rental Business
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Diven provides all the tools you need to create a professional
                  rental website and manage your business efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Laptop className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Custom Rental Website</h3>
                  <p className="text-muted-foreground">
                    Create a professional website for your rental business with
                    customizable templates and no coding required.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Inventory Management</h3>
                  <p className="text-muted-foreground">
                    Easily manage your rental inventory, track availability, and
                    prevent double bookings.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Online Payments</h3>
                  <p className="text-muted-foreground">
                    Accept online payments, deposits, and set up recurring
                    billing for your customers.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Customer Management</h3>
                  <p className="text-muted-foreground">
                    Keep track of your customers, their rental history, and
                    communicate with them directly.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Mobile Responsive</h3>
                  <p className="text-muted-foreground">
                    Your rental website works perfectly on all devices, from
                    desktops to smartphones.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Settings className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Advanced Dashboard</h3>
                  <p className="text-muted-foreground">
                    Get insights into your business with analytics, reports, and
                    customizable dashboards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Get Your Rental Business Online in 3 Simple Steps
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Diven makes it easy to create your rental website and start
                  accepting bookings right away.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="relative flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Sign Up & Choose a Template
                  </h3>
                  <p className="text-muted-foreground">
                    Create your Diven account and select from our professionally
                    designed templates for your rental business.
                  </p>
                </div>
                <div className="absolute right-10 top-5 hidden h-0.5 w-full bg-border lg:block lg:w-[calc(50%+1rem)]"></div>
              </div>
              <div className="relative flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Customize & Add Products
                  </h3>
                  <p className="text-muted-foreground">
                    Personalize your website with your branding and add your
                    rental inventory with pricing and availability.
                  </p>
                </div>
                <div className="absolute right-10 top-5 hidden h-0.5 w-full bg-border lg:block lg:w-[calc(50%+1rem)]"></div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Launch & Start Accepting Bookings
                  </h3>
                  <p className="text-muted-foreground">
                    Publish your website and start accepting online bookings and
                    payments from your customers.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <a href="/onboard">
                  Get Started Now
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  One plan fits all. No hidden fees, no surprises.
                </p>
              </div>
            </div>
            <div className="mx-auto  max-w-5xl gap-6 py-12 flex flex-wrap justify-center items-center">
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-muted-foreground">
                    Perfect for all kinds of rental businesses just getting
                    started.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  32€
                  <span className="ml-1 text-base font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 200 rental items</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Website customization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Online booking system and payment processing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Customer management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom domain</span>
                  </li>
                </ul>
                <Button className="mt-8" size="lg">
                  Start Free Trial
                </Button>
              </div>
              {/* <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm ring-2 ring-primary">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-primary bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold">Professional</h3>
                  <p className="text-muted-foreground">
                    For growing rental businesses with more inventory.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  $79
                  <span className="ml-1 text-base font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 200 rental items</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced website customization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Online booking & payment system</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Customer management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority email & chat support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
                <Button className="mt-8" size="lg">
                  Start Free Trial
                </Button>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">
                    For large rental businesses with complex needs.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  $199
                  <span className="ml-1 text-base font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited rental items</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Complete website customization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced booking & payment system</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Enterprise-level</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>24/7 priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>API access & custom integrations</span>
                  </li>
                </ul>
                <Button className="mt-8" size="lg">
                  Contact Sales
                </Button>
              </div> */}
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by Rental Businesses Worldwide
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our customers have to say about how Diven has
                  transformed their rental businesses.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.jpg"
                    width="50"
                    height="50"
                    alt="Customer"
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">
                      Outdoor Equipment Rentals
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <blockquote className="mt-4 text-muted-foreground">
                  "Diven has completely transformed our rental business. We used
                  to manage everything manually, but now our customers can book
                  online and we can track our inventory effortlessly. Our
                  revenue has increased by 40% since we started using Diven."
                </blockquote>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.jpg"
                    width="50"
                    height="50"
                    alt="Customer"
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">
                      Camera Equipment Rentals
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <blockquote className="mt-4 text-muted-foreground">
                  "The dashboard is incredibly intuitive and gives me all the
                  insights I need to run my business. Setting up my rental
                  website was surprisingly easy, and my customers love the
                  seamless booking experience. Highly recommended!"
                </blockquote>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.jpg"
                    width="50"
                    height="50"
                    alt="Customer"
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">Emma Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">
                      Party Equipment Rentals
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <blockquote className="mt-4 text-muted-foreground">
                  "Before Diven, I was spending hours managing bookings and
                  inventory. Now everything is automated, and I can focus on
                  growing my business. The customer support team is also
                  fantastic and always ready to help."
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Rental Business?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of rental businesses that trust Diven to power
                  their online presence.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <a href="#">
                    Start Your 14-Day Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <a href="#">Schedule a Demo</a>
                </Button>
              </div>
              <p className="text-sm">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <a href="/" className="flex items-center space-x-2">
                <span className="inline-block font-bold text-xl">Diven</span>
              </a>
              <p className="text-sm text-muted-foreground">
                The all-in-one platform for creating and managing your rental
                business website.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Diven. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
