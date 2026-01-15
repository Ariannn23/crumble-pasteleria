import {
  FiX,
  FiCheckCircle,
  FiMapPin,
  FiCreditCard,
  FiPhone,
  FiSend,
  FiUser,
  FiDollarSign,
} from "react-icons/fi";

const OrderTicket = ({ open, onClose, order, onWhatsApp }) => {
  if (!open) return null;
  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/40 z-50" />

      {/* TICKET */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-5 text-sm animate-scale-in">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-crumble-chocolate" />
              <h2 className="font-heading text-lg">Pedido confirmado</h2>
            </div>
            <button onClick={onClose}>
              <FiX />
            </button>
          </div>

          {/* DATOS */}
          <div className="mb-3 space-y-1 text-sm">
            <p className="flex items-center gap-2">
              <FiUser /> <strong>Cliente:</strong> {order?.name}
            </p>
            <p className="flex items-center gap-2">
              <FiPhone /> <strong>Teléfono:</strong> {order?.phone}
            </p>
            <p className="flex items-center gap-2">
              <FiMapPin /> <strong>Entrega:</strong>{" "}
              {order?.deliveryType === "pickup"
                ? "Recojo en tienda"
                : "Delivery"}
            </p>
            {order?.deliveryType === "pickup" && (
              <div className="mt-2 p-2 border rounded-lg flex items-start gap-3">
                <FiMapPin className="mt-1 text-crumble-chocolate" />
                <div>
                  <p className="font-medium">Nuestra tienda</p>
                  <p className="text-xs text-gray-500">
                    Jr. Principal 123, Centro — Horario: 9:00 - 20:00
                  </p>
                  <div className="w-full h-24 bg-gray-100 rounded mt-2 flex items-center justify-center text-xs text-gray-400">
                    Mini mapa (referencia)
                  </div>
                </div>
              </div>
            )}

            {order?.address && (
              <p className="flex items-center gap-2">
                <FiMapPin /> <strong>Dirección:</strong> {order.address}
              </p>
            )}

            <p className="flex items-center gap-2">
              {order?.paymentMethod === "cash" ? (
                <>
                  <FiDollarSign /> <strong>Pago:</strong> Efectivo
                </>
              ) : order?.paymentMethod === "card" ? (
                <>
                  <FiCreditCard /> <strong>Pago:</strong> Tarjeta
                </>
              ) : (
                <>
                  <FiCreditCard /> <strong>Pago:</strong> {order?.paymentMethod}
                </>
              )}
            </p>
          </div>

          {/* PRODUCTOS */}
          <div className="border-t border-b py-2 mb-3">
            {order?.items?.map((item) => (
              <div key={item.id} className="flex justify-between text-xs py-1">
                <span>
                  <strong className="mr-1">{item.qty}×</strong> {item.name}
                </span>
                <span className="font-medium">
                  S/. {(item.qty * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="flex justify-between font-semibold mb-4 text-sm">
            <span>Total</span>
            <span>S/. {order?.total?.toFixed(2)}</span>
          </div>

          {/* WHATSAPP */}
          <button
            onClick={onWhatsApp}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <FiSend /> Enviar confirmación por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderTicket;
