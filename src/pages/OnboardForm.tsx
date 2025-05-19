"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import PhoneInput, {
  type Value,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import supabase from "@/lib/supabase";
import { useTranslation } from "react-i18next";

const businessTypes = [
  "Equipment Rental",
  "Vehicle Rental",
  "Property Rental",
  "Event Space Rental",
  "Clothing/Costume Rental",
  "Tool Rental",
  "Furniture Rental",
  "Sports Equipment Rental",
  "Beauty Salon",
  "Other",
];

// Update the Worker interface to store an array of service IDs instead of a string
interface Worker {
  id: string;
  name: string;
  contact: string;
  services: string[];
}

// Update the Product interface to include an image
interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: File;
  imagePreview: string | null;
}

export default function BusinessQuiz() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    businessDescription: "",
    logo: null as File | null,
    primaryColor: "#4f46e5",
    country: "LT",
    inventorySize: "",
    rentalPeriod: "",
    worksAlone: false,
    workers: [] as Worker[],
    products: [] as Product[],
    email: "",
    contactPhone: "",
    additionalFeatures: [] as string[],
    address: "",
  });

  // Update the newWorker state to use an array for services
  const [newWorker, setNewWorker] = useState<Omit<Worker, "id">>({
    name: "",
    contact: "",
    services: [],
  });

  // Update the newProduct state to include image fields
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
    description: "",
    image: new File([], ""),
    imagePreview: null,
  });

  // Determine if we're in beauty salon mode
  const isBeautySalon = formData.businessType === "Beauty Salon";

  // Calculate total steps and progress
  const totalSteps = 5;
  const [progress, setProgress] = useState(20);

  // Update progress when step or business type changes
  useEffect(() => {
    setProgress((step / totalSteps) * 100);
  }, [step, totalSteps]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add a specific handler for the phone input
  const handlePhoneChange = (value: Value | undefined) => {
    const parsedPhoneNumber = parsePhoneNumber(value || "");
    setFormData((prev) => ({
      ...prev,
      contactPhone: value || "",
      country: parsedPhoneNumber?.country ? parsedPhoneNumber.country : "LT",
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, logo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => {
      const features = [...prev.additionalFeatures];
      if (features.includes(feature)) {
        return {
          ...prev,
          additionalFeatures: features.filter((f) => f !== feature),
        };
      } else {
        return { ...prev, additionalFeatures: [...features, feature] };
      }
    });
  };

  const handleWorksAloneChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, worksAlone: checked }));
  };

  const handleNewWorkerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewWorker((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new function to handle file uploads for services
  const handleServiceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewProduct((prev) => ({
            ...prev,
            image: file,
            imagePreview: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Update the addProduct function to reset the image fields
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error(t("onboard.step3Salon.missingInfo"), {
        description: t("onboard.step3Salon.missingInfoDesc"),
      });
      return;
    }

    if (!newProduct.image.size) {
      toast.error(t("onboard.step3Salon.missingImage"), {
        description: t("onboard.step3Salon.missingImageDesc"),
      });
      return;
    }

    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };

    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, product],
    }));

    // Reset the form
    setNewProduct({
      name: "",
      price: "",
      description: "",
      image: new File([], ""),
      imagePreview: null,
    });
  };

  const removeWorker = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      workers: prev.workers.filter((worker) => worker.id !== id),
    }));
  };

  const removeProduct = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((product) => product.id !== id),
    }));
  };

  const handleNextStep = async () => {
    if (step === 1 && !formData.businessName) {
      toast.error(
        t("onboard.step1.businessName") + " " + t("onboard.navigation.error"),
        {
          description: t("onboard.step1.businessNamePlaceholder"),
        }
      );
      return;
    }

    if (step === 3 && !isBeautySalon && !formData.inventorySize) {
      toast.error(
        t("onboard.step3.title") + " " + t("onboard.navigation.error"),
        {
          description: t("onboard.step3.selectInventorySize"),
        }
      );
      return;
    }

    if (step === 3 && isBeautySalon && formData.products.length === 0) {
      toast.error(
        t("onboard.step3Salon.title") + " " + t("onboard.navigation.error"),
        {
          description: t("onboard.step3Salon.missingInfoDesc"),
        }
      );
      return;
    }

    const newStep = step + 1;

    if (newStep > totalSteps) {
      setLoading(true);
      toast(t("onboard.navigation.completeQuiz"), {
        description: t("onboard.navigation.processingInfo"),
      });

      const body = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (
          !(
            (value instanceof File && key !== "logo") ||
            ["workers", "products", "worksAlone"].includes(key)
          )
        ) {
          body.append(
            key,
            value instanceof File ? value : JSON.stringify(value)
          );
        }
      });

      body.append("ip", localStorage.getItem("ip") ?? "0.0.0.0");

      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body,
          method: "POST",
        }
      );

      if (error) {
        console.error("Err: ", error);
        toast.error(t("onboard.navigation.error"), {
          description: t("onboard.navigation.errorDesc"),
        });
        setLoading(false);
      }

      const workerCreateFormData = new FormData();
      workerCreateFormData.append("clientId", data.id);

      for (let i = 0; i < formData.products.length; i++) {
        workerCreateFormData.append(
          "products",
          JSON.stringify({
            name: formData.products[i].name,
            price: formData.products[i].price,
            description: formData.products[i].description,
            id: formData.products[i].id,
          })
        );

        workerCreateFormData.append(
          "productImages",
          formData.products[i].image
        );
      }

      if (formData.worksAlone) {
        workerCreateFormData.append(
          "workers",
          JSON.stringify({
            name: formData.businessName,
            id: Date.now().toString(),
            contact: formData.contactPhone,
            services: formData.products.map((product) => +product.id),
          })
        );
      } else {
        for (let i = 0; i < formData.workers.length; i++) {
          workerCreateFormData.append(
            "workers",
            JSON.stringify({
              name: formData.workers[i].name,
              id: formData.workers[i].id,
              contact: formData.workers[i].contact,
              services: formData.workers[i].services.map(
                (service: string) => +service
              ),
            })
          );
        }
      }

      const { data: workerData, error: workerError } =
        await supabase.functions.invoke("create-workers", {
          body: workerCreateFormData,
          method: "POST",
        });

      if (workerError) {
        console.error("Error creating workers:", workerError);
        setLoading(false);
        toast.error(t("onboard.navigation.error"), {
          description: t("onboard.navigation.errorDesc"),
        });
        return;
      }

      if (workerData) {
        console.log("Workers created successfully:", workerData);
      }

      setLoading(false);
      window.location.href = data.url;
      return;
    }

    setStep(newStep);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      let newStep = step - 1;

      // Handle conditional steps when going back
      if (isBeautySalon) {
        // For beauty salon: Skip inventory step (3)
        if (newStep === 3) {
          newStep = 2;
        }
      } else {
        // For other businesses: Skip team & products step (4)
        if (newStep === 4) {
          newStep = 3;
        }
      }

      setStep(newStep);
    }
  };

  // Add a function to handle service selection for workers
  const handleWorkerServiceToggle = (serviceId: string) => {
    setNewWorker((prev) => {
      const services = [...prev.services];
      if (services.includes(serviceId)) {
        return { ...prev, services: services.filter((id) => id !== serviceId) };
      } else {
        return { ...prev, services: [...services, serviceId] };
      }
    });
  };

  // Update the addWorker function to handle the new services array
  const addWorker = () => {
    if (!newWorker.name || !newWorker.contact) {
      toast.error(t("onboard.step4.missingInfo"), {
        description: t("onboard.step4.missingInfoDesc"),
      });
      return;
    }

    const worker: Worker = {
      ...newWorker,
      id: Date.now().toString(),
    };

    setFormData((prev) => ({
      ...prev,
      workers: [...prev.workers, worker],
    }));

    // Reset the form
    setNewWorker({
      name: "",
      contact: "",
      services: [],
    });
  };

  useEffect(() => {
    if (localStorage.getItem("formData")) {
      const storedData = JSON.parse(localStorage.getItem("formData") || "{}");
      setFormData(storedData);
    }
  }, []);

  // Get the current step content
  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>{t("onboard.step1.title")}</CardTitle>
              <CardDescription>
                {t("onboard.step1.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">
                  {t("onboard.step1.businessName")}
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  placeholder={t("onboard.step1.businessNamePlaceholder")}
                  value={formData.businessName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 grow">
                <Label htmlFor="businessType">
                  {t("onboard.step1.businessType")}
                </Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) =>
                    handleSelectChange("businessType", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={t("onboard.step1.selectBusinessType")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t(
                          `onboard.step1.businessTypes.${type
                            .toLowerCase()
                            .replace(/\s/g, "")}`
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription">
                  {t("onboard.step1.businessDescription")}
                </Label>
                <Textarea
                  id="businessDescription"
                  name="businessDescription"
                  placeholder={t(
                    "onboard.step1.businessDescriptionPlaceholder"
                  )}
                  rows={4}
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>{t("onboard.step1.logo")}</CardTitle>
              <CardDescription>{t("onboard.step1.uploadLogo")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logo">{t("onboard.step1.logo")}</Label>
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      document.getElementById("logo-upload")?.click();
                    }}
                  >
                    {logoPreview ? (
                      <div className="relative w-40 h-40 border rounded-lg overflow-hidden">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo preview"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center w-full">
                    <Label
                      htmlFor="logo-upload"
                      className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md cursor-pointer hover:bg-primary/90"
                    >
                      {logoPreview
                        ? t("onboard.step1.change")
                        : t("onboard.step1.uploadLogo")}
                    </Label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryColor">
                  {t("onboard.step1.primaryColor")}
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="primaryColor"
                    name="primaryColor"
                    type="color"
                    value={formData.primaryColor}
                    onChange={handleInputChange}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.primaryColor}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This color will be used as the primary accent color on your
                  website
                </p>
              </div>
            </CardContent>
          </>
        );
      case 3:
        // For Beauty Salon, show Team & Services at step 3
        if (isBeautySalon) {
          return (
            <>
              <CardHeader>
                <CardTitle>{t("onboard.step3Salon.title")}</CardTitle>
                <CardDescription>
                  {t("onboard.step3Salon.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Services Section */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-medium">
                    {t("onboard.step3Salon.title")}
                  </h3>

                  {/* List of added products/services */}
                  {formData.products.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {formData.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-start justify-between p-3 border rounded-md bg-muted/50"
                        >
                          <div className="flex gap-3">
                            {product.imagePreview && (
                              <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                  src={
                                    product.imagePreview || "/placeholder.svg"
                                  }
                                  alt={product.name}
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="space-y-1 flex-1 pr-4">
                              <div className="flex gap-1 justify-between">
                                <p className="font-medium">{product.name}</p>
                                <p className="font-medium">${product.price}</p>
                              </div>
                              {product.description && (
                                <p className="text-sm text-muted-foreground">
                                  {product.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add service form */}
                  <div className="space-y-3 p-4 border rounded-md">
                    <h4 className="text-sm font-medium">
                      {t("onboard.step3Salon.addService")}
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <Label htmlFor="productName">
                            {t("onboard.step3Salon.serviceName")}
                          </Label>
                          <Input
                            id="productName"
                            name="name"
                            placeholder={t(
                              "onboard.step3Salon.serviceNamePlaceholder"
                            )}
                            value={newProduct.name}
                            onChange={handleNewProductChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="productPrice">
                            {t("onboard.step3Salon.price")}
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              $
                            </span>
                            <Input
                              id="productPrice"
                              name="price"
                              placeholder={t(
                                "onboard.step3Salon.pricePlaceholder"
                              )}
                              className="pl-7"
                              type="number"
                              value={newProduct.price}
                              onChange={handleNewProductChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="productDescription">
                          {t("onboard.step3Salon.serviceDescription")}
                        </Label>
                        <Textarea
                          id="productDescription"
                          name="description"
                          placeholder={t(
                            "onboard.step3Salon.serviceDescriptionPlaceholder"
                          )}
                          rows={2}
                          value={newProduct.description}
                          onChange={handleNewProductChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="serviceImage">
                          {t("onboard.step3Salon.image")}
                        </Label>
                        <div className="flex items-center gap-4">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              document
                                .getElementById("service-image-upload")
                                ?.click();
                            }}
                          >
                            {newProduct.imagePreview ? (
                              <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                                <img
                                  src={
                                    newProduct.imagePreview ||
                                    "/placeholder.svg"
                                  }
                                  alt="Service preview"
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-20 h-20 border-2 border-dashed rounded-md flex items-center justify-center bg-muted">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <Label
                              htmlFor="service-image-upload"
                              className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md cursor-pointer hover:bg-primary/90"
                            >
                              {newProduct.imagePreview
                                ? "Change Image"
                                : "Upload Image"}
                            </Label>
                            <Input
                              id="service-image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleServiceImageChange}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Upload an image for this service
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={addProduct}
                        className="w-full sm:w-auto"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Team Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="worksAlone"
                      checked={formData.worksAlone}
                      onCheckedChange={handleWorksAloneChange}
                    />
                    <Label htmlFor="worksAlone" className="font-medium">
                      {t("onboard.step4.worksAlone")}
                    </Label>
                  </div>

                  {!formData.worksAlone && (
                    <div className="space-y-4 pt-2">
                      <h3 className="text-sm font-medium">
                        {t("onboard.step4.yourTeam")}
                      </h3>

                      {/* List of added workers */}
                      {formData.workers.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {formData.workers.map((worker) => (
                            <div
                              key={worker.id}
                              className="flex items-start justify-between p-3 border rounded-md bg-muted/50"
                            >
                              <div className="space-y-1">
                                <p className="font-medium">{worker.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {worker.contact}
                                </p>
                                {worker.services.length > 0 && (
                                  <div className="text-sm">
                                    <span>
                                      {t("onboard.step3Salon.title")}:{" "}
                                    </span>
                                    <span>
                                      {worker.services
                                        .map((serviceId) => {
                                          const service =
                                            formData.products.find(
                                              (p) => p.id === serviceId
                                            );
                                          return service ? service.name : "";
                                        })
                                        .filter(Boolean)
                                        .join(", ")}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeWorker(worker.id)}
                              >
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add worker form */}
                      <div className="space-y-3 p-4 border rounded-md">
                        <h4 className="text-sm font-medium">
                          {t("onboard.step4.addWorker")}
                        </h4>
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="space-y-1">
                              <Label htmlFor="workerName">
                                {t("onboard.step4.workerName")}
                              </Label>
                              <Input
                                id="workerName"
                                name="name"
                                placeholder={t(
                                  "onboard.step4.workerNamePlaceholder"
                                )}
                                value={newWorker.name}
                                onChange={handleNewWorkerChange}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="workerContact">
                                {t("onboard.step4.contact")}
                              </Label>
                              <Input
                                id="workerContact"
                                name="contact"
                                placeholder={t(
                                  "onboard.step4.contactPlaceholder"
                                )}
                                value={newWorker.contact}
                                onChange={handleNewWorkerChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>
                              {t("onboard.step4.availableServices")}
                            </Label>
                            <div className="border rounded-md p-3 max-h-[200px] overflow-y-auto">
                              {formData.products.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                  {t("onboard.step4.selectServices")}
                                </p>
                              ) : (
                                <div className="space-y-2">
                                  {formData.products.map((service) => (
                                    <div
                                      key={service.id}
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={`service-${service.id}`}
                                        checked={newWorker.services.includes(
                                          service.id
                                        )}
                                        onCheckedChange={() =>
                                          handleWorkerServiceToggle(service.id)
                                        }
                                      />
                                      <Label
                                        htmlFor={`service-${service.id}`}
                                        className="text-sm cursor-pointer flex-1"
                                      >
                                        {service.name}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={addWorker}
                            className="w-full sm:w-auto"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            {t("onboard.step4.addWorker")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </>
          );
        } else {
          // For other businesses, show Inventory at step 3
          return (
            <>
              <CardHeader>
                <CardTitle>{t("onboard.step3.title")}</CardTitle>
                <CardDescription>
                  {t("onboard.step3.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inventorySize">
                    {t("onboard.step3.inventorySize")}
                  </Label>
                  <RadioGroup
                    value={formData.inventorySize}
                    onValueChange={(value) =>
                      handleSelectChange("inventorySize", value)
                    }
                    className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="small" id="inventory-small" />
                      <Label
                        htmlFor="inventory-small"
                        className="flex-1 cursor-pointer"
                      >
                        {t("onboard.step3.inventorySizes.small")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="medium" id="inventory-medium" />
                      <Label
                        htmlFor="inventory-medium"
                        className="flex-1 cursor-pointer"
                      >
                        {t("onboard.step3.inventorySizes.medium")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="large" id="inventory-large" />
                      <Label
                        htmlFor="inventory-large"
                        className="flex-1 cursor-pointer"
                      >
                        {t("onboard.step3.inventorySizes.large")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rentalPeriod">
                    {t("onboard.step3.rentalPeriod")}
                  </Label>
                  <RadioGroup
                    value={formData.rentalPeriod}
                    onValueChange={(value) =>
                      handleSelectChange("rentalPeriod", value)
                    }
                    className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="hourly" id="rental-hourly" />
                      <Label
                        htmlFor="rental-hourly"
                        className="flex-1 cursor-pointer"
                      >
                        {t("onboard.step3.periods.hourly")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="daily" id="rental-daily" />
                      <Label
                        htmlFor="rental-daily"
                        className="flex-1 cursor-pointer"
                      >
                        {t("onboard.step3.periods.daily")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="weekly" id="rental-weekly" />
                      <Label
                        htmlFor="rental-weekly"
                        className="flex-1 cursor-pointer"
                      >
                        {t("onboard.step3.periods.weekly")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="monthly" id="rental-monthly" />
                      <Label
                        htmlFor="rental-monthly"
                        className="flex-1 cursor-pointer"
                      >
                        {t("onboard.step3.periods.monthly")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Products Section for rental businesses */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-sm font-medium">Products</h3>

                  {/* List of added products */}
                  {formData.products.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {formData.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-start justify-between p-3 border rounded-md bg-muted/50"
                        >
                          <div className="space-y-1 flex-1 pr-4">
                            <div className="flex justify-between">
                              <p className="font-medium">{product.name}</p>
                              <p className="font-medium">${product.price}</p>
                            </div>
                            {product.description && (
                              <p className="text-sm text-muted-foreground">
                                {product.description}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add product form */}
                  <div className="space-y-3 p-4 border rounded-md">
                    <h4 className="text-sm font-medium">Add Product</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <Label htmlFor="productName">Product Name</Label>
                          <Input
                            id="productName"
                            name="name"
                            placeholder="Premium Camera"
                            value={newProduct.name}
                            onChange={handleNewProductChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="productPrice">Price</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              $
                            </span>
                            <Input
                              id="productPrice"
                              name="price"
                              placeholder="99.99"
                              className="pl-7"
                              type="number"
                              value={newProduct.price}
                              onChange={handleNewProductChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="productDescription">Description</Label>
                        <Textarea
                          id="productDescription"
                          name="description"
                          placeholder="Describe your product"
                          rows={2}
                          value={newProduct.description}
                          onChange={handleNewProductChange}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={addProduct}
                        className="w-full sm:w-auto"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          );
        }
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>{t("onboard.step2.title")}</CardTitle>
              <CardDescription>
                {t("onboard.step2.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("onboard.step2.email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("onboard.step2.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t("onboard.step2.address")}</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder={t("onboard.step2.addressPlaceholder")}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">{t("onboard.step2.phone")}</Label>
                {/* Replace Input with PhoneInput */}
                <PhoneInput
                  id="contactPhone"
                  name="contactPhone"
                  placeholder={t("onboard.step2.phone")}
                  value={formData.contactPhone as Value | undefined}
                  onChange={handlePhoneChange}
                  inputComponent={Input}
                  defaultCountry="US"
                />
              </div>
            </CardContent>
          </>
        );
      case 5:
        return (
          <>
            <CardHeader>
              <CardTitle>{t("onboard.step5.title")}</CardTitle>
              <CardDescription>
                {t("onboard.step5.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t("onboard.step5.title")}</Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    "Online Bookings",
                    "Online Payments",
                    "Customer Reviews",
                    ...(isBeautySalon
                      ? ["Service Management", "Gift Cards"]
                      : [
                          "Inventory Management",
                          "Damage Deposits",
                          "Delivery Options",
                        ]),
                  ].map((feature) => (
                    <div
                      key={feature}
                      className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer ${
                        formData.additionalFeatures.includes(feature)
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => handleFeatureToggle(feature)}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border">
                        {formData.additionalFeatures.includes(feature) && (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <span className="text-sm">
                        {t(
                          `onboard.step5.features.${feature
                            .toLowerCase()
                            .replace(/\s/g, "")}`
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:py-24">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("onboard.step1.title")}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t("onboard.step1.description")}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{t("onboard.step1.title")}</span>
          <span>{t("onboard.step1.logo")}</span>
          {isBeautySalon ? (
            <>
              <span>{t("onboard.step3Salon.title")}</span>
              <span>{t("onboard.step2.title")}</span>
              <span>{t("onboard.step5.title")}</span>
            </>
          ) : (
            <>
              <span>{t("onboard.step3.title")}</span>
              <span>{t("onboard.step2.title")}</span>
              <span>{t("onboard.step5.title")}</span>
            </>
          )}
        </div>
      </div>

      <Card className="border-2">
        {loading ? (
          <div className="flex items-center w-full grow justify-center h-full">
            <Loader className="animate-spin" />
          </div>
        ) : (
          getStepContent()
        )}

        <CardFooter className="flex flex-col justify-center items-start">
          <span className="mb-2 text-sm text-gray-400">
            By finishing the quiz, you agree to our{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary"
            >
              terms and conditions.
            </a>
          </span>
          <div className="flex w-full justify-between">
            <Button
              variant="outline"
              onClick={loading ? () => {} : handlePrevStep}
              disabled={step === 1 || loading}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("onboard.navigation.previous")}
            </Button>
            <Button
              disabled={loading}
              onClick={loading ? () => {} : handleNextStep}
            >
              {step === totalSteps ? (
                <>
                  {t("onboard.navigation.submit")}
                  <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  {t("onboard.navigation.next")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
