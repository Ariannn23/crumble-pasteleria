import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    image: "/images/carrusel1-texto.png",
  },
  {
    image: "/images/carrusel2-texto.png",
  },
  {
    image: "/images/carrusel3-texto.png",
  },
  {
    image: "/images/carrusel4-texto.png",
  },
];

const HeroCarousel = ({ className = "h-[420px] md:h-[600px]" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-lg">
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt={s.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        {/* overlay text minimalista */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-3xl px-6">
            <h2 className="text-white font-heading text-3xl md:text-5xl drop-shadow-lg">
              {slides[index].title}
            </h2>
            <p className="text-white opacity-90 mt-3 text-sm md:text-lg drop-shadow-sm">
              {slides[index].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* botones laterales (fuera del recorte) */}
      <button
        onClick={prev}
        aria-label="anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 px-2 py-1 rounded-md pointer-events-auto z-40"
      >
        <FiChevronLeft size={28} />
      </button>

      <button
        onClick={next}
        aria-label="siguiente"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 px-2 py-1 rounded-md pointer-events-auto z-40"
      >
        <FiChevronRight size={28} />
      </button>
    </div>
  );
};

export default HeroCarousel;
