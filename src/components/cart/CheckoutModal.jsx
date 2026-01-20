import {
  FiX,
  FiMapPin,
  FiTruck,
  FiShoppingBag,
  FiAlertCircle,
  FiClipboard,
  FiCreditCard,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";
import { useState } from "react";
import PaymentSection from "./PaymentSection";

const CheckoutModal = ({ open, onClose, onContinue, total = 0, cart = [] }) => {
  // Usar el `total` recibido si existe, si no calcularlo desde `cart`
  const totalFromCart = Array.isArray(cart)
    ? cart.reduce(
        (acc, item) => acc + item.price * (item.quantity ?? item.qty ?? 0),
        0,
      )
    : 0;

  const totalToPay =
    typeof total === "number" && total > 0 ? total : totalFromCart;

  const [step, setStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cash, setCash] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  if (!open) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/40 z-50  transition-opacity"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="bg-[#fffaf5] w-full max-w-md rounded-2xl shadow-2xl p-6 animate-scale-in border border-crumble-peach/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl text-crumble-dark flex items-center gap-2">
              {step === 1 && (
                <>
                  <FiClipboard /> Datos del pedido
                </>
              )}
              {step === 2 && (
                <>
                  <FiCreditCard /> Método de pago
                </>
              )}
              {step === 3 && (
                <>
                  <FiCheckCircle /> Confirmación
                </>
              )}
            </h2>
            <button
              onClick={onClose}
              className="text-crumble-dark p-2 rounded-full hover:bg-crumble-rose/10 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* PASO 1 */}
          {step === 1 && (
            <>
              <div className="mb-6">
                <p className="text-sm font-medium mb-3 text-crumble-secondary">
                  Tipo de entrega
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeliveryType("delivery")}
                    className={`flex-1 py-3 rounded-xl border transition-all duration-200 font-medium flex items-center justify-center gap-2 ${
                      deliveryType === "delivery"
                        ? "bg-crumble-primary text-white border-crumble-primary shadow-lg shadow-crumble-primary/20 scale-105"
                        : "bg-white text-gray-600 border-crumble-peach/50 hover:border-crumble-rose/50"
                    }`}
                  >
                    Delivery <FiTruck />
                  </button>
                  <button
                    onClick={() => setDeliveryType("pickup")}
                    className={`flex-1 py-3 rounded-xl border transition-all duration-200 font-medium flex items-center justify-center gap-2 ${
                      deliveryType === "pickup"
                        ? "bg-crumble-primary text-white border-crumble-primary shadow-lg shadow-crumble-primary/20 scale-105"
                        : "bg-white text-gray-600 border-crumble-peach/50 hover:border-crumble-rose/50"
                    }`}
                  >
                    Recojo <FiShoppingBag />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-crumble-dark mb-1 ml-1">
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-white border border-crumble-peach/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crumble-primary/20 focus:border-crumble-primary transition-all"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-crumble-dark mb-1 ml-1">
                    TELÉFONO
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 999 999 999"
                    className="w-full bg-white border border-crumble-peach/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crumble-primary/20 focus:border-crumble-primary transition-all"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>

                {deliveryType === "delivery" && (
                  <div className="animate-fade-in">
                    <label className="block text-xs font-semibold text-crumble-dark mb-1 ml-1">
                      DIRECCIÓN
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Av. Siempre Viva 123"
                      className="w-full bg-white border border-crumble-peach/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crumble-primary/20 focus:border-crumble-primary transition-all"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                  </div>
                )}

                {deliveryType === "pickup" && (
                  <div className="animate-fade-in mt-2 p-4 border border-crumble-peach/30 rounded-xl bg-white shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-crumble-cream p-2 rounded-full">
                        <FiMapPin className="text-crumble-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-crumble-dark">
                          Recojo en tienda
                        </p>
                        <p className="text-xs text-crumble-secondary mt-1">
                          Visítanos en Jr. Principal 123, Centro.
                          <br />
                          Horario: 9:00 - 20:00
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-crumble-dark mb-1 ml-1">
                    OBSERVACIONES (OPCIONAL)
                  </label>
                  <textarea
                    placeholder="Ej. Timbre malogrado, o 'Sin mucha azúcar'"
                    rows="2"
                    className="w-full bg-white border border-crumble-peach/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crumble-primary/20 focus:border-crumble-primary transition-all resize-none"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-crumble-primary text-white font-bold py-4 rounded-xl mt-6 hover:bg-crumble-secondary hover:shadow-lg transition-all transform active:scale-95"
              >
                Continuar
              </button>
            </>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <>
              <div className="bg-white p-4 rounded-xl border border-crumble-peach/30 mb-6 text-center shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Total a pagar</p>
                <p className="font-heading text-3xl text-crumble-dark">
                  S/. {totalToPay.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex-1 py-3 rounded-xl border transition-all duration-200 font-medium flex items-center justify-center gap-2 ${
                    paymentMethod === "cash"
                      ? "bg-crumble-primary text-white border-crumble-primary shadow-lg shadow-crumble-primary/20 scale-105"
                      : "bg-white text-gray-600 border-crumble-peach/50 hover:border-crumble-rose/50"
                  }`}
                >
                  Efectivo <FiDollarSign />
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-3 rounded-xl border transition-all duration-200 font-medium flex items-center justify-center gap-2 ${
                    paymentMethod === "card"
                      ? "bg-crumble-primary text-white border-crumble-primary shadow-lg shadow-crumble-primary/20 scale-105"
                      : "bg-white text-gray-600 border-crumble-peach/50 hover:border-crumble-rose/50"
                  }`}
                >
                  Tarjeta <FiCreditCard />
                </button>
              </div>

              {paymentMethod === "cash" && (
                <div className="animate-fade-in bg-white p-4 rounded-xl border border-crumble-peach/30 mb-4">
                  <PaymentSection
                    total={totalToPay}
                    cash={cash}
                    setCash={setCash}
                  />
                  <p className="text-xs text-crumble-rose mt-2 flex items-center gap-1">
                    <FiAlertCircle /> El monto entregado debe ser igual o mayor
                    al total.
                  </p>
                </div>
              )}

              <button
                disabled={
                  !paymentMethod ||
                  (paymentMethod === "cash" &&
                    (isNaN(parseFloat(cash)) || parseFloat(cash) < totalToPay))
                }
                onClick={() => {
                  const data = {
                    name: form.name,
                    phone: form.phone,
                    address: form.address,
                    notes: form.notes,
                    deliveryType,
                    paymentMethod,
                    cash:
                      paymentMethod === "cash"
                        ? parseFloat(cash || 0)
                        : undefined,
                  };

                  if (onContinue) onContinue(data);
                  onClose();
                }}
                className="w-full bg-crumble-primary text-white font-bold py-4 rounded-xl mt-2 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed hover:bg-crumble-secondary hover:shadow-lg transition-all transform active:scale-95"
              >
                Confirmar pedido
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full text-crumble-secondary text-sm font-medium py-3 mt-2 hover:underline"
              >
                Volver atrás
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
