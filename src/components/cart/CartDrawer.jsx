import { FiX, FiTrash2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import OrderTicket from "../checkout/OrderTicket";
import Button from "../ui/Button";

const CartDrawer = ({ open, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [order, setOrder] = useState(null);

  if (!open) return null;

  // ✅ TOTAL SEGURO
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* DRAWER */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-xl flex flex-col animate-slide-in">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-heading text-lg">Tu carrito</h2>
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              Tu carrito está vacío
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start border-b pb-3"
              >
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.qty} × S/. {item.price.toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    S/. {(item.qty * item.price).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t space-y-3">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>S/. {total.toFixed(2)}</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setCheckoutOpen(true)}
            >
              Realizar pedido
            </Button>
          </div>
        )}
      </div>

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={total}
        onContinue={(data) => {
          const finalOrder = {
            ...data,
            items: cartItems,
            total,
          };

          setOrder(finalOrder);
          setCheckoutOpen(false);
          setTicketOpen(true);
        }}
      />

      {/* TICKET FINAL */}
      <OrderTicket
        open={ticketOpen}
        order={order}
        onClose={() => {
          setTicketOpen(false);
          clearCart();
          onClose();
        }}
        onWhatsApp={() => {
          if (!order) return;

          const deliveryLabel =
            order.deliveryType === "pickup" ? "Recojo en tienda" : "Delivery";
          const paymentLabel =
            order.paymentMethod === "cash"
              ? "Efectivo"
              : order.paymentMethod === "card"
                ? "Tarjeta"
                : order.paymentMethod;

          const storeInfo =
            order.deliveryType === "pickup"
              ? `Tienda: Jr. Principal 123, Centro`
              : "";

          const message = `Pedido Crumble - Pedido confirmado\n\nCliente: ${
            order.name
          }\nTeléfono: ${order.phone}\nEntrega: ${deliveryLabel}\n${
            order.address ? `Dirección: ${order.address}\n` : ""
          }${storeInfo ? `${storeInfo}\n` : ""}\nProductos:\n${order.items
            .map(
              (i) =>
                `- ${i.qty}x ${i.name} - S/. ${(i.qty * i.price).toFixed(2)}`,
            )
            .join("\n")}\n\nTotal: S/. ${order.total.toFixed(
            2,
          )}\nPago: ${paymentLabel}`;

          window.open(
            `https://wa.me/51954222598?text=${encodeURIComponent(message)}`,
            "_blank",
          );
        }}
      />
    </>
  );
};

export default CartDrawer;
