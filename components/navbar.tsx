"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Store } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">VendorSupport</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>

            {user ? (
              <>
                {user.type === "vendor" && (
                  <Link href="/vendor/dashboard" className="text-gray-600 hover:text-gray-900">
                    Vendor Dashboard
                  </Link>
                )}
                {user.type === "supplier" && (
                  <Link href="/supplier/dashboard" className="text-gray-600 hover:text-gray-900">
                    Supplier Dashboard
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Button onClick={logout} variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Button asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900" onClick={toggleMenu}>
                Home
              </Link>

              {user ? (
                <>
                  {user.type === "vendor" && (
                    <Link href="/vendor/dashboard" className="text-gray-600 hover:text-gray-900" onClick={toggleMenu}>
                      Vendor Dashboard
                    </Link>
                  )}
                  {user.type === "supplier" && (
                    <Link href="/supplier/dashboard" className="text-gray-600 hover:text-gray-900" onClick={toggleMenu}>
                      Supplier Dashboard
                    </Link>
                  )}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">Welcome, {user.name}</p>
                    <Button onClick={logout} variant="outline" size="sm" className="w-full bg-transparent">
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-600 hover:text-gray-900" onClick={toggleMenu}>
                    Login
                  </Link>
                  <Button asChild className="w-full">
                    <Link href="/auth/register" onClick={toggleMenu}>
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
