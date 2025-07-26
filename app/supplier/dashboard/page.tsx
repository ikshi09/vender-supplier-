"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Package, DollarSign, Calendar } from "lucide-react"
import { OfferCard } from "@/components/offer-card"

interface Offer {
  id: string
  itemName: string
  basePrice: number
  discountPrice: number
  supplierName: string
  validityDate: string
  quantity: string
}

// Mock existing offers
const initialOffers: Offer[] = [
  {
    id: "1",
    itemName: "Premium Basmati Rice",
    basePrice: 80,
    discountPrice: 65,
    supplierName: "Your Company",
    validityDate: "2024-02-15",
    quantity: "50kg bags",
  },
  {
    id: "2",
    itemName: "Cooking Oil (Refined)",
    basePrice: 120,
    discountPrice: 95,
    supplierName: "Your Company",
    validityDate: "2024-02-20",
    quantity: "15L containers",
  },
]

export default function SupplierDashboard() {
  const { user } = useAuth()
  const [offers, setOffers] = useState<Offer[]>(initialOffers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newOffer, setNewOffer] = useState({
    itemName: "",
    basePrice: "",
    discountPrice: "",
    quantity: "",
    validityDate: "",
  })

  if (!user || user.type !== "supplier") {
    return <div>Access denied</div>
  }

  const handleInputChange = (field: string, value: string) => {
    setNewOffer((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const offer: Offer = {
      id: Date.now().toString(),
      itemName: newOffer.itemName,
      basePrice: Number.parseFloat(newOffer.basePrice),
      discountPrice: Number.parseFloat(newOffer.discountPrice),
      supplierName: user.name,
      validityDate: newOffer.validityDate,
      quantity: newOffer.quantity,
    }

    setOffers((prev) => [offer, ...prev])
    setNewOffer({
      itemName: "",
      basePrice: "",
      discountPrice: "",
      quantity: "",
      validityDate: "",
    })
    setIsDialogOpen(false)
  }

  const handleDeleteOffer = (offerId: string) => {
    setOffers((prev) => prev.filter((offer) => offer.id !== offerId))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Dashboard</h1>
          <p className="text-gray-600">Manage your offers and reach verified vendors</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
              <DialogDescription>Add a new discounted offer for verified vendors</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={newOffer.itemName}
                  onChange={(e) => handleInputChange("itemName", e.target.value)}
                  placeholder="e.g., Premium Basmati Rice"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (₹)</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    step="0.01"
                    value={newOffer.basePrice}
                    onChange={(e) => handleInputChange("basePrice", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPrice">Discount Price (₹)</Label>
                  <Input
                    id="discountPrice"
                    type="number"
                    step="0.01"
                    value={newOffer.discountPrice}
                    onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity/Unit</Label>
                <Input
                  id="quantity"
                  value={newOffer.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="e.g., 50kg bags, 15L containers"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validityDate">Validity Date</Label>
                <Input
                  id="validityDate"
                  type="date"
                  value={newOffer.validityDate}
                  onChange={(e) => handleInputChange("validityDate", e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Create Offer
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offers.length}</div>
            <p className="text-xs text-muted-foreground">Active offers for vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Discount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {offers.length > 0
                ? Math.round(
                    offers.reduce(
                      (acc, offer) => acc + ((offer.basePrice - offer.discountPrice) / offer.basePrice) * 100,
                      0,
                    ) / offers.length,
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Average discount offered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Until</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {offers.length > 0
                ? new Date(Math.max(...offers.map((o) => new Date(o.validityDate).getTime()))).toLocaleDateString()
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Latest expiry date</p>
          </CardContent>
        </Card>
      </div>

      {/* Offers List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Offers</CardTitle>
          <CardDescription>Manage your current offers for verified vendors</CardDescription>
        </CardHeader>
        <CardContent>
          {offers.length > 0 ? (
            <div className="grid gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className="relative">
                  <OfferCard offer={offer} showActions onDelete={() => handleDeleteOffer(offer.id)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No offers yet</h3>
              <p className="text-gray-600 mb-4">Create your first offer to start reaching verified vendors</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Offer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
