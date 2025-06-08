import type React from "react";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Check, Globe, Rocket, Save, Upload } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import supabase from "@/lib/supabase";
import { User } from "@/store/userSlice";
import { toast } from "sonner";
import { format } from "date-fns";
import { lt } from "date-fns/locale";
import { useTranslation } from "react-i18next";

interface Deployment {
  id: string;
  created_at: string;
  status: string;
  netlify_url: string;
  message: string;
}

export default function SettingsPage() {
  const { user, workers } = useSelector((state: RootState) => state.user);
  const totalRev = useMemo(
    () => workers.reduce((acc, worker) => (acc += worker.revenue), 0),
    [workers]
  );
  const navigate = useNavigate();
  const [changeUser, setChangeUser] = useState<User | null>(user ?? null);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { t } = useTranslation();
  const [deploymentStatus, setDeploymentStatus] = useState<
    "idle" | "deploying" | "success" | "error"
  >("idle");
  const [deploymentDialogOpen, setDeploymentDialogOpen] = useState(false);

  // Domain settings state
  const [customDomain, setCustomDomain] = useState("");

  const handleSaveSettings = () => {
    setSaving(true);

    if (changeUser) {
      // Simulate API call
      supabase
        .from("client")
        .update({ ...changeUser })
        .eq("id", changeUser.id)
        .then(({ error }) => {
          if (error) {
            toast.error("Nepavyko išsaugoti pakeitimų");
          } else {
            setSaved(true);
            setSaving(false);
          }
        });
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (changeUser) {
      const file = e.target.files?.[0];
      if (file) {
        // In a real app, you would upload this to a server
        // For now, we'll just create a local URL
        const fileBitArray = new Uint8Array(await file.arrayBuffer());
        const { error } = await supabase.storage
          .from("client-logos")
          .upload(
            `${changeUser?.businessName.toLowerCase()}-logo`,
            fileBitArray,
            {
              contentType: file.type,
              upsert: true,
            }
          );

        if (error) {
          toast.error("There was an issue with uploading new logo!");
          return;
        }
        toast.success("Logo uploaded successfully!");
        setChangeUser({
          ...changeUser,
          logo: URL.createObjectURL(file),
        });
      }
    }
  };

  const handleDeploySite = () => {
    if (!user) return;
    supabase.functions
      .invoke("deploy-site", {
        method: "POST",
        body: {
          baseDomain: "diven.lt",
          subdomain: user.businessName,
          clientId: user.id,
          sourceRepo: "MB-Diven/beauty_salon_boilerplate",
          siteId: user.site_id,
        },
      })
      .then(({ data }) => {
        if (data.success) {
          setDeploymentStatus("success");
        } else {
          setDeploymentStatus("error");
        }
      })
      .finally(() => {
        setDeploymentDialogOpen(false);
      });
  };

  useEffect(() => {
    if (user) {
      setChangeUser(user);
      supabase
        .from("deployments")
        .select("created_at, id, netlify_url, status")
        .order("created_at", { ascending: false })
        .eq("client_id", user.id)
        .then(({ data }) => {
          setDeployments(data as Deployment[]);
        });
    }
  }, [user]);

  if (!changeUser) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nustatymai</h1>
          <p className="text-muted-foreground">
            Valdykite savo verslo nustatymus ir išmokas.
          </p>
        </div>
        <Dialog
          open={deploymentDialogOpen}
          onOpenChange={setDeploymentDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Rocket className="mr-2 h-4 w-4" />
              Publikuoti svetainę
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Publikuoti svetainę</DialogTitle>
              <DialogDescription>
                Publikuokite naujausius pakeitimus savo svetainėje. Tai gali
                užtrukti kelias minutes.
              </DialogDescription>
            </DialogHeader>
            {deploymentStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium">Publikavimas sėkmingas!</h3>
                <p className="text-muted-foreground">
                  Jūsų svetainė buvo sėkmingai atnaujinta.
                </p>
                <div className="mt-4">
                  <Button variant="outline" asChild className="mt-2">
                    <a
                      href={`https://${changeUser.businessName.toLowerCase()}.diven.lt`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Peržiūrėti svetainę
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="py-4">
                  {deploymentStatus === "deploying" ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-4 flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      </div>
                      <h3 className="text-xl font-medium">Publikuojama...</h3>
                      <p className="text-muted-foreground">
                        Jūsų svetainė yra publikuojama. Tai gali užtrukti kelias
                        minutes.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Prieš publikuojant</AlertTitle>
                        <AlertDescription>
                          Įsitikinkite, kad visi pakeitimai yra išsaugoti.
                          Publikavimas gali užtrukti iki 5 minučių.
                        </AlertDescription>
                      </Alert>
                      <div className="rounded-md border p-4">
                        <h4 className="font-medium">Publikavimo informacija</h4>
                        <div className="mt-2 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Domenas:
                            </span>
                            <span>
                              https://{changeUser.businessName.toLowerCase()}
                              .diven.lt
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Paskutinis publikavimas:
                            </span>
                            <span>2023-04-25 14:30</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Statusas:
                            </span>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <span className="h-2 w-2 rounded-full bg-green-500"></span>
                              <span>Live</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  {deploymentStatus === "deploying" ? (
                    <Button disabled>Publikuojama...</Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setDeploymentDialogOpen(false)}
                      >
                        Atšaukti
                      </Button>
                      <Button onClick={handleDeploySite}>
                        Publikuoti dabar
                      </Button>
                    </>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Bendra</TabsTrigger>
          <TabsTrigger value="appearance">Išvaizda</TabsTrigger>
          <TabsTrigger value="domain">Domenas</TabsTrigger>
          <TabsTrigger value="content">Turinys</TabsTrigger>
          <TabsTrigger value="payments">Mokėjimai</TabsTrigger>
          <TabsTrigger value="deployment">Publikavimas</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verslo informacija</CardTitle>
              <CardDescription>
                Atnaujinkite pagrindinę savo verslo informaciją.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Verslo pavadinimas</Label>
                <Input
                  id="business-name"
                  value={changeUser.businessName}
                  onChange={(e) =>
                    setChangeUser({
                      ...changeUser,
                      businessName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="business-email">El. paštas</Label>
                  <Input
                    id="business-email"
                    type="email"
                    value={changeUser.email}
                    onChange={(e) =>
                      setChangeUser({ ...changeUser, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-phone">Telefono numeris</Label>
                  <Input
                    id="business-phone"
                    value={changeUser.contactPhone}
                    onChange={(e) =>
                      setChangeUser({
                        ...changeUser,
                        contactPhone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-address">Adresas</Label>
                <Input
                  id="business-address"
                  value={changeUser.address}
                  onChange={(e) =>
                    setChangeUser({ ...changeUser, address: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-type">Verslo tipas</Label>
                <Select defaultValue="beauty">
                  <SelectTrigger id="business-type">
                    <SelectValue placeholder="Pasirinkite verslo tipą" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beauty">Grožio salonas</SelectItem>
                    <SelectItem value="retail">Mažmeninė prekyba</SelectItem>
                    <SelectItem value="service">Paslaugų teikėjas</SelectItem>
                    <SelectItem value="other">Kita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex items-center flex-wrap gap-2">
              <Button onClick={handleSaveSettings} disabled={saving}>
                {saving ? (
                  <>Išsaugoma...</>
                ) : saved ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Išsaugota
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Išsaugoti pakeitimus
                  </>
                )}
              </Button>
              <Button
                onClick={() => navigate("/cancel-subscription")}
                disabled={saving}
                variant="destructive"
              >
                Nutraukti abonementą
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Išvaizdos nustatymai</CardTitle>
              <CardDescription>
                Pritaikykite savo svetainės išvaizdą.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Pagrindinė spalva</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primary-color"
                    type="color"
                    value={changeUser.primaryColor}
                    onChange={(e) =>
                      setChangeUser({
                        ...changeUser,
                        primaryColor: e.target.value,
                      })
                    }
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={changeUser.primaryColor}
                    onChange={(e) =>
                      setChangeUser({
                        ...changeUser,
                        primaryColor: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Logotipas</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-md border">
                    <img
                      src={changeUser.logo || "/placeholder.svg"}
                      alt="Business logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="logo-input"
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed p-3 hover:bg-muted"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Įkelti naują logotipą</span>
                      <Input
                        id="logo-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </Label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Rekomenduojamas dydis: 512x512px. Maksimalus dydis: 2MB.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme-select">Tema</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="theme-select">
                    <SelectValue placeholder="Pasirinkite temą" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Šviesi</SelectItem>
                    <SelectItem value="dark">Tamsi</SelectItem>
                    <SelectItem value="system">Sistemos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={saving}>
                {saving ? (
                  <>Išsaugoma...</>
                ) : saved ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Išsaugota
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Išsaugoti pakeitimus
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Domeno nustatymai</CardTitle>
              <CardDescription>
                Valdykite savo svetainės domeną.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-domain">Dabartinis domenas</Label>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current-domain"
                    value={
                      changeUser.custom_domain
                        ? changeUser.custom_domain
                        : `https://${changeUser.businessName.toLowerCase()}.diven.lt`
                    }
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Tai yra jūsų dabartinis Diven subdomenas.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="custom-domain">
                  Pasirinktinis domenas (Gali užtrukti iki 24 val. iki kol
                  pasirodys)
                </Label>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="custom-domain"
                    placeholder="jusu-domenas.lt"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Įveskite savo pasirinktinį domeną, kurį norite naudoti.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={saving}>
                {saving ? (
                  <>Išsaugoma...</>
                ) : saved ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Išsaugota
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Išsaugoti pakeitimus
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Turinio nustatymai</CardTitle>
              <CardDescription>
                Redaguokite savo svetainės tekstą ir turinį.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-message">Pasisveikinimo žinutė</Label>
                <Input
                  id="welcome-message"
                  value={changeUser.welcome_message}
                  onChange={(e) =>
                    setChangeUser({
                      ...changeUser,
                      welcome_message: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Ši žinutė bus rodoma jūsų svetainės pradžioje.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="about">Apie verslą</Label>
                <Textarea
                  id="about"
                  value={changeUser.about}
                  onChange={(e) =>
                    setChangeUser({
                      ...changeUser,
                      about: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Ši žinutė bus rodoma jūsų svetainės "apie" sekcijoje.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-description">Verslo paantraštė</Label>
                <Textarea
                  id="business-description"
                  value={changeUser.businessDescription}
                  onChange={(e) =>
                    setChangeUser({
                      ...changeUser,
                      businessDescription: e.target.value,
                    })
                  }
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Trumpas jūsų verslo aprašymas, kuris bus rodomas jūsų
                  svetainėje.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={saving}>
                {saving ? (
                  <>Išsaugoma...</>
                ) : saved ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Išsaugota
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Išsaugoti pakeitimus
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mokėjimų nustatymai</CardTitle>
              <CardDescription>Tikrinkit savo išmokas.</CardDescription>
            </CardHeader>
            <CardContent className="space-t-4">
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dabartinis balansas</h3>
                    <p className="text-2xl font-bold">
                      €
                      {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      }).format(totalRev)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Paskutinis atnaujinimas:{" "}
                      {format(new Date(), "dd.MM.yyyy")}
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="text-sm mt-2">
                {t("dashboard.settings.payments.expectedPayments")}
              </h3>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Svetainės publikavimas</CardTitle>
              <CardDescription>
                Valdykite savo svetainės publikavimą ir stebėkite jos būseną.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Svetainės būsena</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Live</span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Paskutinis atnaujinimas:{" "}
                        {format(
                          new Date(deployments[0]?.created_at ?? new Date()),
                          "PPPP",
                          {
                            locale: lt,
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <a
                      href={
                        changeUser.custom_domain
                          ? changeUser.custom_domain
                          : `https://${changeUser.businessName.toLowerCase()}.diven.lt`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Peržiūrėti svetainę
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Publikavimo istorija</h3>
                <div className="rounded-md border">
                  <div className="divide-y">
                    {deployments.map((deployment, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`flex items-center gap-1 ${
                                deployment.status === "SUCCESS" ||
                                deployment.status === "PENDING"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  deployment.status === "SUCCESS" ||
                                  deployment.status === "PENDING"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></span>
                              <span>
                                {deployment.status === "SUCCESS" ||
                                deployment.status === "PENDING"
                                  ? "Sėkminga"
                                  : "Klaida"}
                              </span>
                            </Badge>
                            <span className="text-sm">
                              {format(new Date(deployment.created_at), "PPPP", {
                                locale: lt,
                              })}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {deployment.message ?? "Automatinis publikavimas"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Automatinis publikavimas</AlertTitle>
                <AlertDescription>
                  Jūsų svetainė automatiškai publikuojama kiekvieną kartą, kai
                  išsaugote pakeitimus. Jei norite publikuoti rankiniu būdu,
                  naudokite mygtuką "Publikuoti svetainę".
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setDeploymentDialogOpen(true)}>
                <Rocket className="mr-2 h-4 w-4" />
                Publikuoti svetainę
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
