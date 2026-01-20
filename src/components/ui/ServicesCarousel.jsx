import { useEffect, useRef } from "react";
import { FiGift, FiCoffee, FiHeart, FiUsers } from "react-icons/fi";

const services = [
  {
    id: 1,
    title: "Tortas personalizadas",
    desc: "Diseños a medida para bodas y eventos",
    icon: <FiGift />,
  },
  {
    id: 2,
    title: "Cheesecakes y tartas",
    desc: "Clásicos y sabores de autor",
    icon: <FiHeart />,
  },
  {
    id: 3,
    title: "Postres por porción",
    desc: "Cajas y porciones para compartir",
    icon: <FiCoffee />,
  },
  {
    id: 4,
    title: "Pedidos para eventos",
    desc: "Catering y entregas programadas",
    icon: <FiUsers />,
  },
  {
    id: 5,
    title: "Servicio de Cafetería",
    desc: "Café de especialidad y bebidas frías.",
    icon: <FiUsers />,
  },
  {
    id: 6,
    title: "Boxes de Regalo",
    desc: "Cajas surtidas con dedicatoria a domicilio",
    icon: <FiGift />,
  },
  {
    id: 7,
    title: "Línea Saludable",
    desc: "Opciones sin azúcar, veganas y gluten-free",
    icon: <FiHeart />,
  },
];

const ServicesCarousel = ({ className = "" }) => {
  const containerRef = useRef(null);
  const posRef = useRef({ x: 0, vx: 0.3, dragging: false, lastPointer: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Duplicate children to create seamless loop
    const start = () => {
      const step = () => {
        if (!posRef.current.dragging) {
          posRef.current.x -= posRef.current.vx; // move left
        }

        // reset when scrolled half (because we duplicated items)
        const width = el.scrollWidth / 2;
        if (Math.abs(posRef.current.x) >= width) {
          posRef.current.x += width;
        }

        el.style.transform = `translateX(${posRef.current.x}px)`;
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    start();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e) => {
      posRef.current.dragging = true;
      posRef.current.startClientX = e.clientX || e.touches?.[0]?.clientX;
      posRef.current.startX = posRef.current.x;
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      if (!posRef.current.dragging) return;
      const clientX = e.clientX || e.touches?.[0]?.clientX;
      const dx = clientX - posRef.current.startClientX;
      posRef.current.x = posRef.current.startX + dx;
      el.style.transform = `translateX(${posRef.current.x}px)`;
    };

    const onPointerUp = () => {
      posRef.current.dragging = false;
      el.style.cursor = "grab";
    };

    // mouse
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // touch support
    el.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // set initial styles
    el.style.display = "flex";
    el.style.alignItems = "stretch";
    el.style.cursor = "grab";

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, []);

  return (
    <div className={`overflow-hidden py-8 -my-8 ${className}`}>
      <div
        ref={containerRef}
        className="flex gap-4 items-stretch"
        style={{ willChange: "transform" }}
      >
        {[...services, ...services].map((s, i) => (
          <div
            key={`${s.id}-${i}`}
            className="min-w-[260px] bg-white rounded-xl p-6 shadow-md border border-gray-100 flex-shrink-0 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3 text-crumble-chocolate">
              <div className="w-12 h-12 rounded-full bg-crumble-cream flex items-center justify-center text-xl group-hover:bg-crumble-primary group-hover:text-white transition-colors duration-300">
                {s.icon}
              </div>
              <h4 className="font-heading font-medium text-lg text-crumble-dark">
                {s.title}
              </h4>
            </div>
            <p className="text-sm text-gray-600 flex-1 leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;
