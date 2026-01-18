import Products from "./Products";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/ui/HeroCarousel";
import ServicesCarousel from "../components/ui/ServicesCarousel";

const Home = () => {
  return (
    <>
      {/* HERO grande: carrusel full-width */}
      <section className="relative">
        <div className="w-full">
          <HeroCarousel />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            {/* <h1 className="text-white font-heading text-4xl md:text-5xl drop-shadow-lg">
              Crumble
            </h1>
            <p className="text-white opacity-90 mt-2 max-w-2xl drop-shadow-sm">
              Pastelería artesanal — tortas, cheesecakes y postres hechos a mano
              con ingredientes locales.
            </p> */}
          </div>
        </div>
      </section>

      {/* Productos más pedidos (grid) */}
      <section className="py-8">
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
            <Link
              to="/shop"
              className="bg-crumble-chocolate text-white px-4 py-2 rounded-md shadow hover:opacity-90 text-sm"
            >
              Pedir ahora
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl mb-2">Nuestros servicios</h2>
          <ServicesCarousel />
        </div>
      </section>

      {/* HISTORIA + IMAGEN FIJA */}
      <section className="py-12 bg-crumble-cream">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-heading text-3xl mb-8">Nuestra Historia</h2>
            <p className="text-gray-700 mb-3">
              Crumble nació del amor por lo hecho a mano y el deseo de crear
              momentos memorables alrededor de un postre. Desde una pequeña
              cocina hasta convertirse en una pastelería local, cada receta
              refleja dedicación y cariño. Nos especializamos en tortas
              personalizadas y postres para eventos que se recuerdan.
            </p>
            <p className="text-gray-700">
              Utilizamos ingredientes frescos y técnicas cuidadas para ofrecer
              texturas y sabores equilibrados. Puedes recoger tu pedido en
              tienda o pedir delivery; siempre con presentación lista para
              disfrutar.
            </p>
          </div>

          <div className="w-full h-64 bg-gray-100 rounded overflow-hidden">
            <img
              src="/images/negocio3.jpg"
              alt="Nuestra tienda"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl mb-8">Nuestros Productos</h2>
          <div>
            <Products showHeading={false} wrapSection={false} limit={4} />
            <div className="flex justify-center mt-6">
              <Link
                to="/shop"
                className="bg-crumble-chocolate text-white px-4 py-2 rounded-md shadow hover:opacity-90 text-sm"
              >
                Pedir ahora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
