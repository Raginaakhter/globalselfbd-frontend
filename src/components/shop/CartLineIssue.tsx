import { TriangleAlert } from "lucide-react";
import type { CartLine } from "@/context/CartContext";

// Shown under a backend cart line that can no longer be ordered (inactive, out of stock, …).
export default function CartLineIssue({ line }: { line: CartLine }) {
  if (line.isAvailable) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-rose-600">
      <TriangleAlert className="w-3.5 h-3.5" /> {line.issue ?? "No longer available"}
    </p>
  );
}
