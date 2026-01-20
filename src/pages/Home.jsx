import Products from "./Products";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/ui/HeroCarousel";
import ServicesCarousel from "../components/ui/ServicesCarousel";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Button from "../components/ui/Button";

const Home = () => {
  const productsRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const historyRef = useScrollAnimation();
  const catalogRef = useScrollAnimation();

  return (
    <div className="page-transition">
      {/* HERO grande: carrusel full-width */}
      <section className="relative">
        <div className="w-full">
          <HeroCarousel />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6"></div>
        </div>
      </section>

      {/* Productos más pedidos (grid) */}
      <section ref={productsRef} className="py-8 scroll-fade-up">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl mb-4">Productos Recomendados</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
            {products.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex flex-col items-center text-center"
              >
                <div className="w-full rounded-lg overflow-hidden bg-white shadow-sm">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-crumble-dark">
                  {p.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/shop">
              <Button variant="primary" size="md">
                Pedir ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section ref={servicesRef} className="py-4 scroll-fade-up">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl mb-2">Nuestros servicios</h2>
          <ServicesCarousel />
        </div>
      </section>

      {/* PRODUCTOS */}
      <section ref={catalogRef} className="py-12 scroll-fade-up">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl mb-6">Nuestros Productos</h2>
          <div>
            <Products showHeading={false} wrapSection={false} limit={4} />
            <div className="flex justify-center mt-6">
              <Link to="/shop">
                <Button variant="primary" size="md">
                  Ver todos los productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
