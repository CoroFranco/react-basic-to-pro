import { useContext } from "react";
import { CartContext } from "../contexts/cart";

export default function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }

  return context;
}
