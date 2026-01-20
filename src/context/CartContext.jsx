import { createContext, useContext, useEffect, useState, useRef } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("crumble-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("crumble-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });
  const notificationTimeout = useRef(null);

  const addToCart = (product) => {
    const price = parseFloat(
      String(product.price).replace("S/.", "").replace("S/", "").trim(),
    );

    if (isNaN(price)) {
      console.error("Precio inválido:", product);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price, // ✅ número real
          qty: 1,
        },
      ];
    });

    // mostrar notificación breve (solo vía contexto para evitar duplicados)
    setNotification({
      open: true,
      message: `${product.name} agregado al carrito`,
    });
    if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
    // mantener el timeout alineado con el toast (5s)
    notificationTimeout.current = setTimeout(() => {
      setNotification({ open: false, message: "" });
    }, 5000);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item)),
    );
  };

  const clearCart = () => setCartItems([]);

  // ✅ CONTADORES CORRECTOS
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        // notification
        notification,
        setNotification,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
