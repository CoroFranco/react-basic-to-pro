import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.findIndex((item) => item.title === product.title);
      if (existingProduct >= 0) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        console.log('nuevo')
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (title) => {
      setCart(prevCart => prevCart.filter((item) => item.title !== title));
  };

  const addOneProduct = (title) => {
      setCart(prevCart => 
          prevCart.map(item =>
          item.title === title ? { ...item, quantity: item.quantity + 1 } : item
        )    
      )
  }

  const removeOneProduct = (title) => {
    setCart(prevCart => {
        return prevCart
            .map(item => item.title === title ? { ...item, quantity: item.quantity - 1 } : item)
            .filter(item => item.quantity > 0); 
    });
};


  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, addOneProduct, removeOneProduct }}>
      {children}
    </CartContext.Provider>
  );
}
