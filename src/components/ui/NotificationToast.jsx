import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiCheck, FiX, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const AUTO_CLOSE = 5000; // ms
const FADE_MS = 400; // Faster fade for snapper feel

const NotificationToast = () => {
  const { notification, setNotification } = useCart();
  const [toasts, setToasts] = useState([]); // array of {id, product, leaving, collapsed}
  const [heights, setHeights] = useState({});
  const COLLAPSE_MS = 150;

  // helper to add toast
  const addToast = (product) => {
    const id = Date.now() + Math.random();
    const t = { id, product, leaving: false, collapsed: false };
    setToasts((s) => [...s, t]);

    // schedule start of fade before collapse
    setTimeout(() => {
      setToasts((s) =>
        s.map((x) => (x.id === id ? { ...x, leaving: true } : x)),
      );
    }, AUTO_CLOSE - FADE_MS);

    // after fade finishes, collapse height so others slide up smoothly
    setTimeout(() => {
      setToasts((s) =>
        s.map((x) => (x.id === id ? { ...x, collapsed: true } : x)),
      );
    }, AUTO_CLOSE);

    // finally remove from list after collapse duration
    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id));
    }, AUTO_CLOSE + COLLAPSE_MS);
  };

  // mirror context notification into queue
  useEffect(() => {
    if (notification?.open && notification?.product) {
      addToast(notification.product); // eslint-disable-line react-hooks/set-state-in-effect
      // clear context notification
      setNotification({ open: false, product: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification?.open]);

  // fallback event listener (legacy support if needed)
  useEffect(() => {
    const handler = (e) => {
      const msg = e?.detail?.message;
      if (msg) addToast({ name: msg }); // Mock product if only message
    };
    window.addEventListener("crumble:notify", handler);
    return () => window.removeEventListener("crumble:notify", handler);
  }, []);

  const handleClose = (id) => {
    // trigger leaving (move right + fade)
    setToasts((s) => s.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    // after fade, collapse height so others slide up
    setTimeout(() => {
      setToasts((s) =>
        s.map((x) => (x.id === id ? { ...x, collapsed: true } : x)),
      );
    }, FADE_MS);
    // remove after collapse
    setTimeout(
      () => setToasts((s) => s.filter((x) => x.id !== id)),
      FADE_MS + COLLAPSE_MS,
    );
  };

  if (toasts.length === 0) return null;

  const toastList = (
    <div className="fixed right-4 bottom-8 z-[9999] pointer-events-none flex flex-col gap-3 items-end">
      {toasts.map((t) => (
        <div
          key={t.id}
          ref={(el) => {
            if (el) {
              const h = el.scrollHeight;
              setHeights((prev) => {
                if (prev[t.id] !== h) {
                  return { ...prev, [t.id]: h };
                }
                return prev;
              });
            }
          }}
          style={{
            maxHeight: t.collapsed ? 0 : `${heights[t.id] || 140}px`,
            transition: `max-height ${COLLAPSE_MS}ms ease, opacity ${FADE_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1), transform ${FADE_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
            overflow: "hidden",
            opacity: t.leaving ? 0 : 1,
            transform: t.leaving
              ? "translateX(20px) scale(0.95)"
              : "translateX(0) scale(1)",
          }}
          className={`pointer-events-auto w-80 relative`}
        >
          <div className="bg-[#fffaf5] text-crumble-dark border border-crumble-peach/40 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
            <div className="flex p-3 gap-3">
              {/* Image Section */}
              <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-crumble-peach/20">
                {t.product.image ? (
                  <img
                    src={t.product.image}
                    alt={t.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-crumble-primary bg-crumble-cream">
                    <FiShoppingCart />
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-crumble-dark truncate pr-4">
                  ¡Agregado al carrito!
                </h4>
                <p className="text-xs text-gray-600 truncate mt-0.5">
                  {t.product.name}
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs text-crumble-primary font-medium">
                  <FiCheck size={12} />
                  <span>Listo para ordenar</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => handleClose(t.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-crumble-rose p-1 transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Progress Bar */}
            <div
              className="h-1 bg-crumble-primary origin-left w-full"
              style={{
                animation: t.leaving
                  ? "none"
                  : `shrink ${AUTO_CLOSE}ms linear forwards`,
              }}
            />
            {/* Define keyframes in global CSS or locally via style tag if needed, but Tailwind doesn't strictly support dynamic keyframes easily without config. 
                Using inline style for animation duration.
                We need to ensure 'shrink' animation exists. Since we can't easily add global css, we can use a transition on width.
            */}
          </div>
          <style>{`
            @keyframes shrink {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}</style>
        </div>
      ))}
    </div>
  );

  return createPortal(toastList, document.body);
};

export default NotificationToast;
