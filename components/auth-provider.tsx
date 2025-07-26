"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "vendor" | "supplier"
  location?: string
  verificationStatus?: "pending" | "verified" | "rejected"
  verificationDocument?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: "vendor" | "supplier") => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

interface RegisterData {
  name: string
  email: string
  password: string
  type: "vendor" | "supplier"
  location?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string, type: "vendor" | "supplier"): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const mockUser: User = {
      id: "1",
      name: email.split("@")[0],
      email,
      type,
      location: type === "vendor" ? "Mumbai, Maharashtra" : undefined,
      verificationStatus: type === "vendor" ? "pending" : undefined,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return true
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      type: data.type,
      location: data.location,
      verificationStatus: data.type === "vendor" ? "pending" : undefined,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
