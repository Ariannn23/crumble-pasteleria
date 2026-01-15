import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { FiCheck, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const AUTO_CLOSE = 5000; // ms
const FADE_MS = 600; // mayor duración para transiciones más suaves

const NotificationToast = () => {
  const { notification, setNotification } = useCart();
  const [toasts, setToasts] = useState([]); // array of {id,message,leaving,collapsed}
  const heights = useRef({});
  const [, forceRerender] = useState(0);
  const COLLAPSE_MS = 180; // duración del colapso después del fade

  // helper to add toast
  const addToast = (message) => {
    const id = Date.now() + Math.random();
    const t = { id, message, leaving: false, collapsed: false };
    setToasts((s) => [...s, t]);

    // schedule start of fade before collapse
    setTimeout(() => {
      setToasts((s) =>
        s.map((x) => (x.id === id ? { ...x, leaving: true } : x))
      );
    }, AUTO_CLOSE - FADE_MS);

    // after fade finishes, collapse height so others slide up smoothly
    setTimeout(() => {
      setToasts((s) =>
        s.map((x) => (x.id === id ? { ...x, collapsed: true } : x))
      );
    }, AUTO_CLOSE);

    // finally remove from list after collapse duration
    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id));
    }, AUTO_CLOSE + COLLAPSE_MS);
  };

  // mirror context notification into queue
  useEffect(() => {
    if (notification?.open) {
      addToast(notification.message);
      // clear context notification
      setNotification({ open: false, message: "" });
    }
  }, [notification?.open]);

  // fallback event listener
  useEffect(() => {
    const handler = (e) => {
      const msg = e?.detail?.message;
      if (msg) addToast(msg);
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
        s.map((x) => (x.id === id ? { ...x, collapsed: true } : x))
      );
    }, FADE_MS);
    // remove after collapse
    setTimeout(
      () => setToasts((s) => s.filter((x) => x.id !== id)),
      FADE_MS + COLLAPSE_MS
    );
  };

  if (toasts.length === 0) return null;

  const toastList = (
    <div className="fixed right-4 top-20 z-[9999] pointer-events-none flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          ref={(el) => {
            if (el) {
              const h = el.scrollHeight;
              if (heights.current[t.id] !== h) {
                heights.current[t.id] = h;
                forceRerender((n) => n + 1);
              }
            }
          }}
          style={{
            maxHeight: t.collapsed ? 0 : `${heights.current[t.id] || 140}px`,
            transition: `max-height ${COLLAPSE_MS}ms ease, opacity ${FADE_MS}ms cubic-bezier(0.22,1,0.36,1), transform ${FADE_MS}ms cubic-bezier(0.22,1,0.36,1)`,
            overflow: "hidden",
            opacity: t.leaving ? 0 : 1,
            transform: t.leaving
              ? "translateX(36px) scale(0.985)"
              : "translateX(0) scale(1)",
          }}
          className={`pointer-events-auto bg-white/95 backdrop-blur-sm text-crumble-chocolate border border-white/60 px-4 py-3 rounded-lg shadow-2xl w-72`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <FiCheck className="text-green-600 mt-0.5" />
              <div>
                <div className="text-sm font-semibold">Producto añadido</div>
                <div className="text-sm">{t.message}</div>
              </div>
            </div>
            <button
              onClick={() => handleClose(t.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return createPortal(toastList, document.body);
};

export default NotificationToast;
