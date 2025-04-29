import type React from "react";

import { useState } from "react";
import {
  AlertCircle,
  Check,
  CreditCard,
  Globe,
  Rocket,
  Save,
  Upload,
} from "lucide-react";

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
import { supabase } from "@/main";
import { RootState } from "@/store/store";

export default function SettingsPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [payoutDialogOpen, setPayoutDialogOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("0.00");
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<
    "idle" | "deploying" | "success" | "error"
  >("idle");
  const [deploymentDialogOpen, setDeploymentDialogOpen] = useState(false);

  // Business settings state
  const [businessName, setBusinessName] = useState("Elegance Salon");
  const [businessEmail, setBusinessEmail] = useState(
    "contact@elegancesalon.com"
  );
  const [businessPhone, setBusinessPhone] = useState("+370 612 34567");
  const [businessAddress, setBusinessAddress] = useState(
    "Vilniaus g. 123, Vilnius"
  );

  // Domain settings state
  const [domain, _] = useState("elegancesalon.diven.lt");
  const [customDomain, setCustomDomain] = useState("");

  // Appearance settings state
  const [primaryColor, setPrimaryColor] = useState("#7c3aed");
  const [logoUrl, setLogoUrl] = useState("/placeholder.svg?height=80&width=80");

  // Content settings state
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Sveiki atvykę į Elegance Salon!"
  );
  const [businessDescription, setBusinessDescription] = useState(
    "Mes teikiame aukščiausios kokybės grožio paslaugas, kad jūs jaustumėtės ir atrodytumėte geriausiai."
  );

  const handleSaveSettings = () => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      // Reset saved state after 3 seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }, 1000);
  };

  const handlePayout = () => {
    // Simulate payout process
    setTimeout(() => {
      setPayoutSuccess(true);

      // Close dialog after success
      setTimeout(() => {
        setPayoutDialogOpen(false);
        setPayoutSuccess(false);
      }, 2000);
    }, 1500);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
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
          githubUsername: "",
          forkName: `${user.businessName
            .toLowerCase()
            .replace(/ /g, "-")}.diven.lt`,
        },
      })
      .then(({ data }) => {
        if (data.success) {
          setDeploymentStatus("success");
        } else {
          setDeploymentStatus("error");
        }
      });
  };

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
                      href={`https://${domain}`}
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
                            <span>{domain}</span>
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
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="business-email">El. paštas</Label>
                  <Input
                    id="business-email"
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-phone">Telefono numeris</Label>
                  <Input
                    id="business-phone"
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-address">Adresas</Label>
                <Input
                  id="business-address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
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
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Logotipas</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-md border">
                    <img
                      src={logoUrl || "/placeholder.svg"}
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
                    value={domain}
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
                <Label htmlFor="custom-domain">Pasirinktinis domenas</Label>
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

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Svarbu</AlertTitle>
                <AlertDescription>
                  Norėdami naudoti pasirinktinį domeną, turite nukreipti savo
                  DNS įrašus į mūsų serverius. Instrukcijas rasite mūsų pagalbos
                  centre.
                </AlertDescription>
              </Alert>
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
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Ši žinutė bus rodoma jūsų svetainės pradžioje.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-description">Verslo aprašymas</Label>
                <Textarea
                  id="business-description"
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Trumpas jūsų verslo aprašymas, kuris bus rodomas jūsų
                  svetainėje.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="footer-text">Poraštės tekstas</Label>
                <Input
                  id="footer-text"
                  placeholder="© 2023 Jūsų verslas. Visos teisės saugomos."
                />
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
              <CardDescription>
                Valdykite savo mokėjimų nustatymus ir išmokas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dabartinis balansas</h3>
                    <p className="text-2xl font-bold">€1,245.50</p>
                    <p className="text-xs text-muted-foreground">
                      Paskutinis atnaujinimas: 2023-04-27
                    </p>
                  </div>
                  <Dialog
                    open={payoutDialogOpen}
                    onOpenChange={setPayoutDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Išmokėti lėšas
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Išmokėti lėšas</DialogTitle>
                        <DialogDescription>
                          Pasirinkite sumą, kurią norite išmokėti į savo banko
                          sąskaitą.
                        </DialogDescription>
                      </DialogHeader>
                      {payoutSuccess ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <div className="mb-4 rounded-full bg-green-100 p-3">
                            <Check className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="text-xl font-medium">
                            Išmoka sėkminga!
                          </h3>
                          <p className="text-muted-foreground">
                            Jūsų lėšos bus pervestos per 1-3 darbo dienas.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="payout-amount">
                                Išmokos suma (€)
                              </Label>
                              <Input
                                id="payout-amount"
                                type="number"
                                min="0"
                                step="0.01"
                                max="1245.50"
                                value={payoutAmount}
                                onChange={(e) =>
                                  setPayoutAmount(e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="payout-method">
                                Išmokos būdas
                              </Label>
                              <Select defaultValue="bank">
                                <SelectTrigger id="payout-method">
                                  <SelectValue placeholder="Pasirinkite išmokos būdą" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bank">
                                    Banko pavedimas
                                  </SelectItem>
                                  <SelectItem value="paypal">PayPal</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setPayoutDialogOpen(false)}
                            >
                              Atšaukti
                            </Button>
                            <Button onClick={handlePayout}>
                              Patvirtinti išmoką
                            </Button>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="bank-account">Banko sąskaita</Label>
                <Input id="bank-account" placeholder="LT123456789012345678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank-name">Banko pavadinimas</Label>
                <Input id="bank-name" placeholder="SEB / Swedbank / Luminor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-holder">Sąskaitos savininkas</Label>
                <Input
                  id="account-holder"
                  placeholder="Vardas Pavardė / Įmonės pavadinimas"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="payment-methods">Priimami mokėjimo būdai</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="visa" defaultChecked />
                    <Label htmlFor="visa">Visa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="mastercard" defaultChecked />
                    <Label htmlFor="mastercard">Mastercard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="cash" defaultChecked />
                    <Label htmlFor="cash">Grynieji</Label>
                  </div>
                </div>
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
                        Paskutinis atnaujinimas: 2023-04-25 14:30
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <a
                      href={`https://${domain}`}
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
                    {[
                      {
                        date: "2023-04-25 14:30",
                        status: "success",
                        changes: "Atnaujinti darbuotojų profiliai",
                      },
                      {
                        date: "2023-04-20 10:15",
                        status: "success",
                        changes: "Pridėti nauji produktai",
                      },
                      {
                        date: "2023-04-15 16:45",
                        status: "error",
                        changes: "Nepavyko atnaujinti domenų nustatymų",
                      },
                      {
                        date: "2023-04-10 09:30",
                        status: "success",
                        changes: "Pradinė svetainės versija",
                      },
                    ].map((deployment, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`flex items-center gap-1 ${
                                deployment.status === "success"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  deployment.status === "success"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></span>
                              <span>
                                {deployment.status === "success"
                                  ? "Sėkminga"
                                  : "Klaida"}
                              </span>
                            </Badge>
                            <span className="text-sm">{deployment.date}</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {deployment.changes}
                          </p>
                        </div>
                        {deployment.status === "success" && (
                          <Button variant="ghost" size="sm">
                            Atkurti
                          </Button>
                        )}
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
