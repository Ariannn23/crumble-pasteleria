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
import { motion, AnimatePresence } from "framer-motion";

const OrderTicket = ({ open, onClose, order, onWhatsApp }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={onClose}
          />

          {/* TICKET CONTAINER */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fffaf5] w-full max-w-sm h-[650px] rounded-none sm:rounded-2xl shadow-2xl p-0 overflow-hidden relative before:absolute before:inset-x-0 before:top-0 before:h-2 before:bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#000_10px,#000_20px)] before:opacity-10 after:absolute after:inset-x-0 after:bottom-0 after:h-2 after:bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#000_10px,#000_20px)] after:opacity-10 flex flex-col pointer-events-auto"
            >
              {/* CONTENT WRAPPER WITH TICKET HOLES EFFECT */}
              <div className="p-6 sm:p-8 relative flex-1 flex flex-col h-full overflow-hidden">
                {/* HEADER */}
                <div className="text-center mb-4 shrink-0">
                  <div className="mx-auto w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-2 animate-bounce">
                    <FiCheckCircle className="text-green-600" size={28} />
                  </div>
                  <h2 className="font-heading text-xl text-crumble-dark font-bold">
                    ¡Pedido Confirmado!
                  </h2>
                  <p className="text-crumble-primary font-bold text-lg mt-1 tracking-widest">
                    {order?.orderNumber}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Gracias por tu preferencia
                  </p>
                </div>

                {/* DIVIDER */}
                <div className="border-t-2 border-dashed border-crumble-peach/50 my-4 relative shrink-0">
                  <div className="absolute -left-8 -top-3 w-6 h-6 bg-gray-800 rounded-full sm:hidden"></div>
                  <div className="absolute -right-8 -top-3 w-6 h-6 bg-gray-800 rounded-full sm:hidden"></div>
                </div>

                {/* SCROLLABLE CONTENT AREA */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0 custom-scrollbar">
                  {/* DATOS */}
                  <div className="space-y-2 text-sm text-gray-700 bg-white p-4 rounded-xl border border-crumble-peach/30 shadow-sm shrink-0">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cliente</span>
                      <span className="font-semibold text-crumble-dark max-w-[60%] text-right truncate">
                        {order?.name}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Teléfono</span>
                      <span className="font-medium">{order?.phone}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-gray-500">Entrega</span>
                      <span className="font-medium text-right bg-crumble-cream px-2 py-0.5 rounded text-crumble-dark text-xs">
                        {order?.deliveryType === "pickup"
                          ? "Recojo en tienda"
                          : "Delivery"}
                      </span>
                    </div>

                    {order?.deliveryType === "delivery" && order?.address && (
                      <div className="flex justify-between items-start">
                        <span className="text-gray-500">Dirección</span>
                        <span className="font-medium text-right max-w-[60%] leading-tight">
                          {order.address}
                        </span>
                      </div>
                    )}

                    {/* RECEIPT DETAILS */}
                    <div className="border-t border-gray-100 my-1 pt-1">
                      <div className="flex justify-between items-start">
                        <span className="text-gray-500">Comprobante</span>
                        <div className="text-right">
                          <span className="font-medium block text-crumble-dark text-xs">
                            {order?.receiptType === "invoice"
                              ? "Factura"
                              : order?.receiptType === "dni"
                                ? "Boleta con DNI"
                                : "Boleta Simple"}
                          </span>
                          {order?.receiptType === "dni" && order?.dni && (
                            <span className="text-[10px] text-gray-500 block">
                              DNI: {order.dni}
                            </span>
                          )}
                          {order?.receiptType === "invoice" && (
                            <>
                              <span className="text-[10px] text-gray-500 block">
                                RUC: {order?.ruc}
                              </span>
                              <span className="text-[10px] text-gray-500 block truncate max-w-[150px]">
                                {order?.businessName}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span className="text-gray-500">Pago</span>
                      <span className="font-medium capitalize flex items-center gap-1">
                        {order?.paymentMethod === "cash" ? (
                          <>
                            Efectivo <FiDollarSign />
                          </>
                        ) : order?.paymentMethod === "card" ? (
                          <>
                            Tarjeta <FiCreditCard />
                          </>
                        ) : (
                          order?.paymentMethod
                        )}
                      </span>
                    </div>
                  </div>

                  {/* PRODUCTOS SUMMARY */}
                  <div className="shrink-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Resumen del pedido
                    </p>
                    <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                      {order?.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm py-1 border-b border-gray-100 last:border-0"
                        >
                          <span className="font-medium text-gray-800">
                            {item.qty}× {item.name}
                          </span>
                          <span className="text-gray-600">
                            S/. {(item.qty * item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-3 px-2 text-crumble-dark">
                      <span>Total</span>
                      <span>S/. {order?.total?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* FOOTER BUTTONS - Fixed at bottom */}
                <div className="space-y-2 mt-4 shrink-0">
                  <button
                    onClick={onWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-green-200 transition-all transform hover:scale-[1.02]"
                  >
                    <FiSend size={18} /> Enviar a WhatsApp
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full text-gray-400 hover:text-gray-600 text-sm font-medium py-2"
                    onClickCapture={onClose}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderTicket;
