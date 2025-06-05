import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setProducts } from "@/store/userSlice";

export default function ProductsPage() {
  const { products } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);

  // Edited product state
  const [editedProduct, setEditedProduct] = useState<any | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDeleteProduct = (productId: number) => {
    supabase
      .from("products")
      .delete()
      .eq("id", productId)
      .then(() => {
        dispatch(
          setProducts(products.filter((product) => product.id !== productId)),
        );

        supabase.from("client").update({
          product_ids: products
            .filter((product) => product.id !== productId)
            .map((product) => product.id),
        });

        supabase.from("workers").update({
          product_ids: products
            .filter((product) => product.id !== productId)
            .map((product) => product.id),
        });
      });
  };

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
              <TableHead>ID</TableHead>
              <TableHead>Produkto pavadinimas</TableHead>
              <TableHead>Kaina</TableHead>
              <TableHead>Pardavimai</TableHead>
              <TableHead>Apibudinimas</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {product.photo ? (
                        <img
                          src={product.photo}
                          alt={`Product photo ${product.name}`}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <Package className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    {product.name}
                  </div>
                </TableCell>
                <TableCell>{product.price}€</TableCell>
                <TableCell>{product.sales} parduota</TableCell>
                <TableCell>{product.description}</TableCell>
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
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600"
                      >
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
