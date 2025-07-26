"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Package, Store, Trash2 } from "lucide-react"

interface Offer {
  id: string
  itemName: string
  basePrice: number
  discountPrice: number
  supplierName: string
  validityDate: string
  quantity: string
}

interface OfferCardProps {
  offer: Offer
  showActions?: boolean
  onDelete?: () => void
}

export function OfferCard({ offer, showActions = false, onDelete }: OfferCardProps) {
  const discountPercentage = Math.round(((offer.basePrice - offer.discountPrice) / offer.basePrice) * 100)
  const isExpiringSoon = new Date(offer.validityDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{offer.itemName}</CardTitle>
          {showActions && onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">Base Price</p>
              <p className="text-lg font-medium line-through text-gray-400">₹{offer.basePrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Discount Price</p>
              <p className="text-xl font-bold text-green-600">₹{offer.discountPrice}</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">{discountPercentage}% OFF</Badge>
        </div>

        {/* Offer Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{offer.supplierName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{offer.quantity}</span>
          </div>
        </div>

        {/* Validity */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Valid until {new Date(offer.validityDate).toLocaleDateString()}</span>
          </div>
          {isExpiringSoon && (
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              Expiring Soon
            </Badge>
          )}
        </div>

        {/* Savings Highlight */}
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              You save ₹{offer.basePrice - offer.discountPrice} per unit
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
