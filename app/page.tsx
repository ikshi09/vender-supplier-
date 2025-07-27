import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, Store, Truck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Street Food Vendor Support Platform</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connecting verified street food vendors with suppliers for discounted raw materials through PM SVANidhi loan
          benefits
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/auth/login?type=vendor">Join as Vendor</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login?type=supplier">Join as Supplier</Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader className="text-center">
            <Store className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <CardTitle>For Vendors</CardTitle>
            <CardDescription>Upload your PM SVANidhi verification and access discounted raw materials</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Upload loan verification documents</li>
              <li>• Get verified status</li>
              <li>• Access exclusive supplier offers</li>
              <li>• Save on raw material costs</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Truck className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <CardTitle>For Suppliers</CardTitle>
            <CardDescription>Create offers for verified vendors and expand your customer base</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Post discounted offers</li>
              <li>• Reach verified vendors</li>
              <li>• Manage your inventory</li>
              <li>• Track offer performance</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <CardTitle>Community Impact</CardTitle>
            <CardDescription>Supporting street food vendors through government loan benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• PM SVANidhi loan integration</li>
              <li>• Verified vendor network</li>
              <li>• Cost-effective sourcing</li>
              <li>• Business growth support</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-6">
          Join our platform today and start benefiting from our vendor-supplier network
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/auth/register">Create Account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}