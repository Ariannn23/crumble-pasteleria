import { FiX, FiMapPin } from "react-icons/fi";
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
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-lg">
              {step === 1 && "Datos del pedido"}
              {step === 2 && "Método de pago"}
              {step === 3 && "Confirmación"}
            </h2>
            <button onClick={onClose}>
              <FiX size={20} />
            </button>
          </div>

          {/* PASO 1 */}
          {step === 1 && (
            <>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Tipo de entrega</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeliveryType("delivery")}
                    className={`flex-1 py-2 rounded-lg border ${
                      deliveryType === "delivery"
                        ? "bg-crumble-cream border-crumble-primary"
                        : "border-gray-300"
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    onClick={() => setDeliveryType("pickup")}
                    className={`flex-1 py-2 rounded-lg border ${
                      deliveryType === "pickup"
                        ? "bg-crumble-cream border-crumble-chocolate"
                        : "border-gray-300"
                    }`}
                  >
                    Recojo
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                {deliveryType === "delivery" && (
                  <input
                    type="text"
                    placeholder="Dirección"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                  />
                )}

                {deliveryType === "pickup" && (
                  <div className="mt-2 p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-start gap-3">
                      <FiMapPin className="text-crumble-primary mt-1" />
                      <div>
                        <p className="font-medium">Recojo en tienda</p>
                        <p className="text-xs text-gray-500">
                          Visítanos en Jr. Principal 123, Centro. Horario: 9:00
                          - 20:00
                        </p>
                        <div className="w-full h-28 bg-gray-100 rounded mt-2 flex items-center justify-center text-xs text-gray-400">
                          Mini mapa (referencia)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <textarea
                  placeholder="Observaciones (opcional)"
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-2"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-crumble-primary text-white py-3 rounded-lg mt-5 hover:bg-crumble-secondary transition"
              >
                Continuar
              </button>
            </>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <>
              <p className="text-sm mb-3 font-medium">
                Total a pagar: <strong>S/. {totalToPay.toFixed(2)}</strong>
              </p>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex-1 py-2 rounded-lg border ${
                    paymentMethod === "cash"
                      ? "bg-crumble-cream border-crumble-chocolate"
                      : "border-gray-300"
                  }`}
                >
                  Efectivo
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-2 rounded-lg border ${
                    paymentMethod === "card"
                      ? "bg-crumble-cream border-crumble-chocolate"
                      : "border-gray-300"
                  }`}
                >
                  Tarjeta
                </button>
              </div>

              {paymentMethod === "cash" && (
                <PaymentSection
                  total={totalToPay}
                  cash={cash}
                  setCash={setCash}
                />
              )}

              {/* validación: si es efectivo, el monto debe ser >= total */}
              {paymentMethod === "cash" && (
                <p className="text-xs text-gray-500 mb-2">
                  El monto entregado debe ser igual o mayor al total.
                </p>
              )}

              <button
                disabled={
                  !paymentMethod ||
                  (paymentMethod === "cash" &&
                    (isNaN(parseFloat(cash)) || parseFloat(cash) < totalToPay))
                }
                onClick={() => {
                  // si pasa la validación, cerrar modal y enviar datos al padre
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
                className="w-full bg-crumble-primary text-white py-3 rounded-lg mt-5 disabled:opacity-50 hover:bg-crumble-secondary transition disabled:hover:bg-crumble-primary"
              >
                Confirmar pedido
              </button>
            </>
          )}

          {/* Nota: el ticket flotante se muestra desde el padre (`CartDrawer`) tras `onContinue` */}
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
