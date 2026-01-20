import { FiX, FiTrash2, FiShoppingCart, FiShoppingBag } from "react-icons/fi";
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
      <div
        className="fixed inset-0 bg-black/40 z-40  transition-opacity"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-[#fffaf5] z-50 shadow-2xl flex flex-col animate-slide-in border-l-4 border-crumble-primary rounded-l-2xl overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-crumble-cream to-[#fffaf5] border-b border-crumble-peach/30">
          <h2 className="font-heading text-xl text-crumble-dark tracking-wide flex items-center gap-2">
            Tu Carrito <FiShoppingCart className="text-crumble-primary" />
          </h2>
          <button
            onClick={onClose}
            className="text-crumble-dark p-2 rounded-full hover:bg-crumble-rose/20 hover:rotate-90 transition-all duration-300 transform"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4 opacity-60">
              <FiShoppingBag size={64} className="text-crumble-peach" />
              <p className="font-heading text-crumble-secondary text-lg">
                ¡Tu carrito está vacío!
              </p>
              <p className="text-sm text-gray-500">
                Agrega algunas delicias para comenzar.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex justify-between items-start bg-white p-4 rounded-xl shadow-sm border border-crumble-peach/20 hover:shadow-md hover:border-crumble-rose/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-1 pr-4">
                  <p className="font-heading text-crumble-dark font-semibold text-base mb-1">
                    {item.name}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="bg-crumble-cream px-2 py-0.5 rounded-md text-xs font-medium text-crumble-dark">
                      x{item.qty}
                    </span>
                    <span>S/. {(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-crumble-rose p-2 rounded-full hover:bg-crumble-primary hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-sm"
                  title="Eliminar producto"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-crumble-peach/30 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-heading text-2xl text-crumble-dark font-bold">
                S/. {total.toFixed(2)}
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setCheckoutOpen(true)}
              className="shadow-lg shadow-crumble-primary/30 hover:shadow-crumble-primary/50"
            >
              Confirmar Compra
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
