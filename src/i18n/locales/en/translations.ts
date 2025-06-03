const enTranslations = {
  // Landing page translations
  landing: {
    header: {
      register: "Register",
    },
    hero: {
      title: "Create Your Rental Business Website in Minutes",
      description:
        "Diven helps you build a professional rental platform and manage your inventory, bookings, and clients all in one place.",
      startFreeTrial: "Start Free Trial",
      bookDemo: "Book a Demo",
      trustedBy: "Trusted by over 2,000 rental businesses worldwide",
    },
    features: {
      title: "Features",
      heading: "Everything You Need to Run Your Rental Business",
      description:
        "Diven provides all the tools you need to create a professional rental website and manage your business efficiently.",

      website: {
        title: "Custom Rental Website",
        description:
          "Create a professional website for your rental business with customizable templates and no coding required.",
      },
      inventory: {
        title: "Inventory Management",
        description:
          "Easily manage your rental inventory, track availability, and prevent double bookings.",
      },
      payments: {
        title: "Online Payments",
        description:
          "Accept online payments, deposits, and set up recurring billing for your customers.",
      },
      customers: {
        title: "Customer Management",
        description:
          "Keep track of your customers, their rental history, and communicate with them directly.",
      },
      mobile: {
        title: "Mobile Responsive",
        description:
          "Your rental website works perfectly on all devices, from desktops to smartphones.",
      },
      dashboard: {
        title: "Advanced Dashboard",
        description:
          "Get insights into your business with analytics, reports, and customizable dashboards.",
      },
    },
    howItWorks: {
      title: "How It Works",
      heading: "Get Your Rental Business Online in 3 Simple Steps",
      description:
        "Diven makes it easy to create your rental website and start accepting bookings right away.",

      step1: {
        title: "Sign Up & Choose a Template",
        description:
          "Create your Diven account and select from our professionally designed templates for your rental business.",
      },
      step2: {
        title: "Customize & Add Products",
        description:
          "Personalize your website with your branding and add your rental inventory with pricing and availability.",
      },
      step3: {
        title: "Launch & Start Accepting Bookings",
        description:
          "Publish your website and start accepting online bookings and payments from your customers.",
      },
      getStarted: "Get Started Now",
    },
    pricing: {
      title: "Pricing",
      heading: "Simple, Transparent Pricing",
      description: "One plan fits all. No hidden fees, no surprises.",

      starter: {
        title: "Starter",
        freeTrial: "Free 7-day trial",
        description:
          "Perfect for all kinds of rental businesses just getting started.",
        price: "32€",
        perMonth: "/month",
        items: {
          0: "Up to 200 rental items",
          1: "Website customization",
          2: "Online booking system and payment processing",
          3: "Customer management",
          4: "Email support",
          5: "Custom domain",
        },
        button: "Start Free Trial",
      },
    },
    testimonials: {
      title: "Testimonials",
      heading: "Trusted by Rental Businesses Worldwide",
      description:
        "See what our customers have to say about how Diven has transformed their rental businesses.",

      testimonial1: {
        name: "Jared Shannon",
        business: "Outdoor Equipment Rentals",
        text: "Diven has completely transformed our rental business. We used to manage everything manually, but now our customers can book online and we can track our inventory effortlessly. Our revenue has increased by 40% since we started using Diven.",
      },
      testimonial2: {
        name: "Michael Chen",
        business: "Camera Equipment Rentals",
        text: "The dashboard is incredibly intuitive and gives me all the insights I need to run my business. Setting up my rental website was surprisingly easy, and my customers love the seamless booking experience. Highly recommended!",
      },
      testimonial3: {
        name: "Emma Rodriguez",
        business: "Beauty salon owner",
        text: "Diven is perfect for our salon. Clients can easily book services online, and the automated reminders have reduced no-shows by 70%. I don't know how we lived without this tool before!",
      },
    },
    cta: {
      heading: "Ready to Transform Your Rental Business?",
      description:
        "Join thousands of rental businesses that trust Diven to power their online presence.",
      startTrial: "Start Your 7-Day Free Trial",
      scheduleDemo: "Schedule a Demo",
      noCreditCard: "No credit card required. Cancel anytime.",
    },
    footer: {
      companyDescription:
        "The all-in-one platform for creating and managing your rental business website.",
      companyTitle: "Company",
      about: "About",
      careers: "Careers",
      press: "Press",
      blog: "Blog",

      productTitle: "Product",
      features: "Features",
      pricing: "Pricing",
      testimonials: "Testimonials",
      faq: "FAQ",

      supportTitle: "Support",
      helpCenter: "Help Center",
      contactUs: "Contact Us",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",

      copyright: "© ${year} Diven. All rights reserved.",
    },
  },

  // Login page translations
  login: {
    title: "Login",
    description: "Enter your login credentials to access your account",
    email: "Email",
    password: "Password",
    emailPlaceholder: "name@example.com",
    passwordPlaceholder: "••••••••",
    forgotPassword: "Forgot Password?",
    rememberMe: "Remember me",
    loginButton: "Login",
    loggingIn: "Logging in...",
    successMessage: "Login successful",
    successDescription: "Welcome back to your account.",
    errorTitle: "Login failed",
    errorDescription: "Invalid email or password. Please try again.",
    missingInfo: "Missing information",
    missingInfoDescription: "Please enter email and password.",
  },

  // Common elements
  common: {
    showPassword: "Show password",
    hidePassword: "Hide password",
    language: "Language",
    languages: {
      lt: "Lithuanian",
      en: "English",
    },
  },

  // Set Password page translations
  setPassword: {
    title: "Set Your Password",
    description: "Create a secure password for your new account",
    password: "Password",
    confirmPassword: "Confirm Password",
    enterPassword: "Enter your password",
    confirmYourPassword: "Confirm your password",
    passwordMustContain: "Password must contain:",
    minLength: "At least 8 characters",
    upperCase: "At least one uppercase letter (A-Z)",
    lowerCase: "At least one lowercase letter (a-z)",
    number: "At least one number (0-9)",
    specialChar: "At least one special character (!@#$%^&*)",
    passwordsMatch: "Passwords match",
    setPasswordButton: "Set Password",
    settingPassword: "Setting Password...",
    passwordSecure: "Your password is securely encrypted",
    alreadyHaveAccount: "Already have an account?",
    logIn: "Log in",
    errorTitle: "Invalid password",
    errorDescription:
      "Please make sure your password meets all requirements and both passwords match.",
    errorSettingPassword: "Error setting password",
    errorSettingDescription:
      "There was a problem setting your password. Please try again.",
    errorSigningIn: "Error signing in",
    errorSigningDescription:
      "There was a problem signing in. Please try again.",
    successMessage: "Password set successfully",
    successDescription:
      "Your account has been created. You can now log in with your new password.",
  },

  // Onboard Form translations
  onboard: {
    step1: {
      title: "Business Basics",
      description:
        "Let's start with some basic information about your business",
      businessName: "Business Name",
      businessNamePlaceholder: "Enter your business name",
      businessType: "Business Type",
      selectBusinessType: "Select your business type",
      businessTypes: {
        equipmentrental: "Equipment Rental",
        vehiclerental: "Vehicle Rental",
        propertyrental: "Property Rental",
        eventspacerental: "Event Space Rental",
        clothingcostumerental: "Clothing/Costume Rental",
        toolrental: "Tool Rental",
        furniturerental: "Furniture Rental",
        sportsequipmentrental: "Sports Equipment Rental",
        beautysalon: "Beauty Salon",
        other: "Other",
      },
      businessDescription: "Business Description",
      businessDescriptionPlaceholder: "Briefly describe your business",
      primaryColor: "Primary Brand Color",
      logo: "Logo & Branding",
      uploadLogo: "Upload Logo",
      change: "Change Logo",
      remove: "Remove",
    },
    step2: {
      title: "Contact Information",
      description: "How can customers get in touch with your business?",
      email: "Business Email",
      emailPlaceholder: "email@yourbusiness.com",
      phone: "Business Phone",
      address: "Business Address",
      addressPlaceholder: "Your business address",
    },
    step3: {
      title: "Rental Inventory",
      description: "Tell us about the items you'll be renting out",
      inventorySize: "Inventory Size",
      selectInventorySize: "Select inventory size",
      inventorySizes: {
        small: "Small (1-10 items)",
        medium: "Medium (11-50 items)",
        large: "Large (50+ items)",
      },
      rentalPeriod: "Typical Rental Period",
      selectPeriod: "Select typical rental period",
      periods: {
        hourly: "Hourly",
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        custom: "Custom",
      },
    },
    step3Salon: {
      title: "Team & Services",
      description: "Tell us about your team and the services you offer",
      serviceName: "Service Name",
      serviceNamePlaceholder: "E.g., Haircut & Styling",
      price: "Price",
      pricePlaceholder: "€0.00",
      serviceDescription: "Description",
      serviceDescriptionPlaceholder: "Describe your service",
      image: "Service Image",
      uploadImage: "Upload Image",
      addService: "Add Service",
      yourServices: "Your Services",
      missingInfo: "Missing information",
      missingInfoDesc: "Please provide at least the service name and price.",
      missingImage: "Missing image",
      missingImageDesc: "Please provide an image for the service.",
    },
    step4: {
      title: "Team",
      description: "Tell us about your staff",
      worksAlone: "I work alone (no additional team members)",
      workerName: "Full Name",
      workerNamePlaceholder: "John Doe",
      contact: "Contact (Email/Phone)",
      contactPlaceholder: "email@example.com",
      availableServices: "Services Provided",
      selectServices: "Add services first to assign them to team members",
      addWorker: "Add Team Member",
      yourTeam: "Team Members",
      missingInfo: "Missing information",
      missingInfoDesc:
        "Please provide at least the worker's name and contact information.",
    },
    step5: {
      title: "Website Preferences",
      description: "Let us know how you'd like your website to be set up",
      features: {
        onlinebookings: "Online Bookings",
        onlinepayments: "Online Payments",
        customerreviews: "Customer Reviews",
        servicemanagement: "Service Management",
        giftcards: "Gift Cards",
        inventorymanagement: "Inventory Management",
        damagedeposits: "Damage Deposits",
        deliveryoptions: "Delivery Options",
      },
    },
    navigation: {
      next: "Next",
      previous: "Back",
      submit: "Submit",
      completeQuiz: "Quiz completed!",
      processingInfo: "Please wait while we process your information.",
      error: "Something went wrong!",
      errorDesc: "Please try again later.",
    },
  },

  // Dashboard translations
  dashboard: {
    overview: {
      title: "Dashboard",
      welcome: "Welcome back! Here's an overview of your business activity.",
      totalRevenue: "Total Revenue",
      newClients: "New Clients",
      reservations: "Reservations",
      productSales: "Product Sales",
      fromLastMonth: "from last month",
      overview: "Overview",
      analytics: "Analytics",
      reports: "Reports",
      recentAppointments: "Recent Appointments",
      latestBookings: "Latest client bookings",
      topPerformers: "Top Performers",
      bestWorkers: "Your best workers this month",
      popularProducts: "Popular Products",
      bestSelling: "Your best selling products this month",
      revenueOverview: "Revenue Overview",
      revenueChart: "Revenue Chart",
      viewAllAppointments: "View all appointments",
      sold: "sold",
      with: "with",
      analyticsTitle: "Analytics",
      analyticsDesc: "Detailed performance metrics for your business",
      analyticsDashboard: "Analytics Dashboard Content",
      reportsTitle: "Reports",
      reportsDesc: "Download and view business reports",
      reportsDashboard: "Reports Dashboard Content",
    },
    clients: {
      title: "Clients",
      description: "Manage and view all your clients.",
    },
    appointments: {
      title: "Appointments",
      description: "Manage all client appointments and bookings.",
      newAppointment: "New Appointment",
    },
    products: {
      title: "Products",
      description: "Manage your product and service catalog.",
    },
    workers: {
      title: "Workers",
      description: "Manage your team members.",
    },
    analytics: {
      title: "Analytics",
      description: "View detailed business performance data.",
    },
    settings: {
      title: "Settings",
      description: "Manage your account and business settings.",
    },
  },
};

export default enTranslations;
