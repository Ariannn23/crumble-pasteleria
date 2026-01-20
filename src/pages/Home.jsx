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
          <div className="mb-12 text-center">
            <h2 className="font-heading text-4xl text-crumble-dark mb-3">
              Productos Recomendados
            </h2>
            <div className="h-1 w-24 bg-crumble-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8">
            {products.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-lg transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="mt-4">
                  <span className="text-lg font-heading text-crumble-dark font-semibold group-hover:text-crumble-primary transition-colors">
                    {p.name}
                  </span>
                </div>
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
          <div className="mb-8">
            <h2 className="font-heading text-3xl text-crumble-dark mb-2">
              Nuestros servicios
            </h2>
            <div className="h-1 w-20 bg-crumble-primary rounded-full"></div>
          </div>
          <ServicesCarousel />
        </div>
      </section>

      {/* PRODUCTOS */}
      <section ref={catalogRef} className="py-12 scroll-fade-up">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-heading text-4xl text-crumble-dark mb-3">
              Nuestros Productos
            </h2>
            <div className="h-1 w-24 bg-crumble-primary rounded-full"></div>
          </div>
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
