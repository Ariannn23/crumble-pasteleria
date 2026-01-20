import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiMinus, FiPlus } from "react-icons/fi";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/products/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading mb-4">Producto no encontrado</h2>
          <button
            onClick={() => navigate("/shop")}
            className="text-crumble-rose hover:underline"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  // Productos relacionados (misma categoría, excluyendo el actual)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <main className="min-h-screen bg-[#fff7ed] page-transition">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Botón Regresar */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white bg-crumble-primary hover:bg-crumble-dark px-4 py-2 rounded-full transition mb-6 ml-auto"
        >
          <FiArrowLeft />
          REGRESAR
        </button>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Galería de Imágenes */}
          <div className="space-y-4">
            {/* Imagen Principal */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Miniaturas - Comentado para más adelante */}
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg overflow-hidden shadow">
                <img
                  src={product.image}
                  alt={`${product.name} - vista 1`}
                  className="w-full h-32 object-cover opacity-75 hover:opacity-100 transition cursor-pointer"
                />
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow">
                <img
                  src={product.image}
                  alt={`${product.name} - vista 2`}
                  className="w-full h-32 object-cover opacity-75 hover:opacity-100 transition cursor-pointer"
                />
              </div>
            </div> */}
          </div>

          {/* Información del Producto */}
          <div className="flex flex-col justify-center">
            <h1 className="font-heading text-4xl text-crumble-dark mb-4">
              {product.name}
            </h1>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Precio */}
            <div className="mb-6">
              <span className="text-sm text-gray-600">Precio:</span>
              <p className="text-3xl font-bold text-crumble-primary">
                S/. {product.price.toFixed(2)}
              </p>
            </div>

            {/* Selector de Cantidad */}
            <div className="mb-6">
              <span className="text-sm text-gray-600 block mb-2">
                Cantidad:
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                  aria-label="Disminuir cantidad"
                >
                  <FiMinus />
                </button>
                <span className="text-2xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                  aria-label="Aumentar cantidad"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Botón Añadir al Carrito */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-crumble-primary hover:bg-crumble-dark text-white font-semibold py-4 rounded-full transition transform hover:scale-105"
            >
              AÑADIR AL CARRITO
            </button>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-heading text-3xl text-center mb-8">
              Los clientes también vieron
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
