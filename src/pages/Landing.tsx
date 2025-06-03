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
import HeroImage from "../assets/hero.png";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-center">
              <div className="flex w-full max-w-lg flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {t("landing.hero.title")}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t("landing.hero.description")}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <a href="/onboard">
                      {t("landing.hero.startFreeTrial")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  {/* <Button size="lg" variant="outline" asChild>
                    <a href="/onboard">{t("landing.hero.bookDemo")}</a>
                  </Button> */}
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
                    {t('landing.hero.trustedBy')}
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
                  {t("landing.features.title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("landing.features.heading")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("landing.features.description")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Laptop className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("landing.features.website.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.features.website.description")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("landing.features.inventory.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.features.inventory.description")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("landing.features.payments.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.features.payments.description")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("landing.features.customers.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.features.customers.description")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("landing.features.mobile.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.features.mobile.description")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Settings className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("landing.features.dashboard.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.features.dashboard.description")}
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
                  {t("landing.howItWorks.title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("landing.howItWorks.heading")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("landing.howItWorks.description")}
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
                    {t("landing.howItWorks.step1.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.howItWorks.step1.description")}
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
                    {t("landing.howItWorks.step2.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.howItWorks.step2.description")}
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
                    {t("landing.howItWorks.step3.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.howItWorks.step3.description")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <a href="/onboard">
                  {t("landing.howItWorks.getStarted")}
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
                  {t("landing.pricing.title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("landing.pricing.heading")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("landing.pricing.description")}
                </p>
              </div>
            </div>
            <div className="mx-auto  max-w-5xl gap-6 py-12 flex flex-wrap justify-center items-center">
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold flex justify-start items-center gap-2">
                    {t("landing.pricing.starter.title")}{" "}
                    <Badge variant="secondary" className="text-white">
                      {t("landing.pricing.starter.freeTrial")}
                    </Badge>
                  </h3>
                  <p className="text-muted-foreground">
                    {t("landing.pricing.starter.description")}
                  </p>
                </div>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  {t("landing.pricing.starter.price")}
                  <span className="ml-1 text-base font-medium text-muted-foreground">
                    {t("landing.pricing.starter.perMonth")}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("landing.pricing.starter.items.0")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("landing.pricing.starter.items.1")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("landing.pricing.starter.items.2")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("landing.pricing.starter.items.3")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("landing.pricing.starter.items.4")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("landing.pricing.starter.items.5")}</span>
                  </li>
                </ul>
                <a href="/onboard">
                  <Button className="mt-8" size="lg">
                    {t("landing.pricing.starter.button")}
                  </Button>
                </a>
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
                  {t("landing.testimonials.title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t("landing.testimonials.heading")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("landing.testimonials.description")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src="/testimonial_1.png"
                    width="50"
                    height="50"
                    alt="Customer"
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">
                      {t("landing.testimonials.testimonial1.name")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("landing.testimonials.testimonial1.business")}
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
                  "{t("landing.testimonials.testimonial1.text")}"
                </blockquote>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src="/testimonial_2.png"
                    width="50"
                    height="50"
                    alt="Customer"
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">
                      {t("landing.testimonials.testimonial2.name")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("landing.testimonials.testimonial2.business")}
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
                  "{t("landing.testimonials.testimonial2.text")}"
                </blockquote>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src="/testimonial_3.jpeg"
                    width="50"
                    height="50"
                    alt="Customer"
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">
                      {t("landing.testimonials.testimonial3.name")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("landing.testimonials.testimonial3.business")}
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
                  "{t("landing.testimonials.testimonial3.text")}"
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
                  {t("landing.cta.heading")}
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("landing.cta.description")}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <a href="/onboard">
                    {t("landing.cta.startTrial")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <a href="/onboard">{t("landing.cta.scheduleDemo")}</a>
                </Button> */}
              </div>
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
                {t("landing.footer.companyDescription")}
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
              <h3 className="text-sm font-medium">
                {t("landing.footer.companyTitle")}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.about")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.careers")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.press")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.blog")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">
                {t("landing.footer.productTitle")}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.features")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.pricing")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.testimonials")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.faq")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">
                {t("landing.footer.supportTitle")}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.helpCenter")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.contactUs")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.privacyPolicy")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.termsOfService")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            {t("landing.footer.copyright").replace(
              "${year}",
              new Date().getFullYear().toString()
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
