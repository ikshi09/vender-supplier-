import { redirect } from "next/navigation";

export default function SupplierPage() {
  // Immediately redirect to supplier dashboard
  redirect("/supplier/dashboard");
}
