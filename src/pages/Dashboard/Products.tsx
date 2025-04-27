import { useState } from "react";
import { MoreHorizontal, Package, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

// Sample product data
const initialProducts = [
  {
    id: "1",
    name: "Premium Hair Serum",
    category: "Hair Care",
    price: "45.00",
    stock: 24,
    sales: 32,
    description:
      "Intensyviai drėkinantis plaukų serumas su keratinu ir argano aliejumi.",
    sku: "HC-001",
    supplier: "Beauty Essentials Ltd.",
  },
  {
    id: "2",
    name: "Hydrating Face Mask",
    category: "Skin Care",
    price: "35.00",
    stock: 18,
    sales: 28,
    description:
      "Giliai drėkinanti veido kaukė su hialurono rūgštimi ir alavijų ekstraktu.",
    sku: "SC-001",
    supplier: "Natural Beauty Co.",
  },
  {
    id: "3",
    name: "Volumizing Shampoo",
    category: "Hair Care",
    price: "28.00",
    stock: 32,
    sales: 24,
    description: "Apimtį didinantis šampūnas su biotin ir kolagenu.",
    sku: "HC-002",
    supplier: "Beauty Essentials Ltd.",
  },
  {
    id: "4",
    name: "Nourishing Conditioner",
    category: "Hair Care",
    price: "28.00",
    stock: 30,
    sales: 22,
    description: "Maitinamasis kondicionierius su keratinu ir argano aliejumi.",
    sku: "HC-003",
    supplier: "Beauty Essentials Ltd.",
  },
  {
    id: "5",
    name: "Anti-Aging Cream",
    category: "Skin Care",
    price: "65.00",
    stock: 12,
    sales: 18,
    description: "Senėjimą stabdantis kremas su retinoliu ir peptidais.",
    sku: "SC-002",
    supplier: "Natural Beauty Co.",
  },
  {
    id: "6",
    name: "Clarifying Toner",
    category: "Skin Care",
    price: "32.00",
    stock: 15,
    sales: 16,
    description:
      "Valomasis tonikas su salicilo rūgštimi ir arbatmedžio aliejumi.",
    sku: "SC-003",
    supplier: "Natural Beauty Co.",
  },
  {
    id: "7",
    name: "Nail Strengthener",
    category: "Nail Care",
    price: "22.00",
    stock: 20,
    sales: 14,
    description: "Nagų stipriklis su kalciu ir keratinu.",
    sku: "NC-001",
    supplier: "Nail Perfect Inc.",
  },
  {
    id: "8",
    name: "Cuticle Oil",
    category: "Nail Care",
    price: "18.00",
    stock: 25,
    sales: 12,
    description: "Odelių aliejus su vitaminu E ir migdolų aliejumi.",
    sku: "NC-002",
    supplier: "Nail Perfect Inc.",
  },
];

// Product categories
const categories = [
  "Hair Care",
  "Skin Care",
  "Nail Care",
  "Body Care",
  "Makeup",
  "Accessories",
];

// Suppliers
const suppliers = [
  "Beauty Essentials Ltd.",
  "Natural Beauty Co.",
  "Nail Perfect Inc.",
  "Organic Beauty Supply",
  "Luxury Cosmetics",
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, _] = useState(initialProducts);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);

  // Edited product state
  const [editedProduct, setEditedProduct] = useState<any | null>(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Produktų valdymas</h1>
        <p className="text-muted-foreground">
          Valdykite savo inventorių, sekite pardavimus ir atnaujinkite produktų
          informaciją.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Ieškoti produktų..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Pridėti naują produktą
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produkto pavadinimas</TableHead>
              <TableHead>Kategorija</TableHead>
              <TableHead>Kaina</TableHead>
              <TableHead>Likutis</TableHead>
              <TableHead>Pardavimai</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    {product.name}
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}€</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.stock > 10
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {product.stock} vnt.
                  </span>
                </TableCell>
                <TableCell>{product.sales} parduota</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Atidaryti meniu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Veiksmai</DropdownMenuLabel>
                      <DropdownMenuItem>Atnaujinti likutį</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Pašalinti produktą
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Product Dialog */}
      {editedProduct && (
        <Dialog
          open={isEditProductDialogOpen}
          onOpenChange={setIsEditProductDialogOpen}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Redaguoti produktą</DialogTitle>
              <DialogDescription>
                Atnaujinkite produkto informaciją.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Produkto pavadinimas</Label>
                  <Input
                    id="edit-name"
                    value={editedProduct.name}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Kategorija</Label>
                  <Select
                    value={editedProduct.category}
                    onValueChange={(value) =>
                      setEditedProduct({ ...editedProduct, category: value })
                    }
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Pasirinkite kategoriją" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Kaina (€)</Label>
                  <Input
                    id="edit-price"
                    value={editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-stock">Likutis (vnt.)</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editedProduct.stock}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        stock: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-sku">SKU kodas</Label>
                  <Input
                    id="edit-sku"
                    value={editedProduct.sku}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        sku: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier">Tiekėjas</Label>
                  <Select
                    value={editedProduct.supplier}
                    onValueChange={(value) =>
                      setEditedProduct({ ...editedProduct, supplier: value })
                    }
                  >
                    <SelectTrigger id="edit-supplier">
                      <SelectValue placeholder="Pasirinkite tiekėją" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Aprašymas</Label>
                <Textarea
                  id="edit-description"
                  value={editedProduct.description}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditProductDialogOpen(false)}
              >
                Atšaukti
              </Button>
              <Button>Išsaugoti pakeitimus</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
