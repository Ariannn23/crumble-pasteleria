import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition h-full flex flex-col">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />

        {/* overlay button that slides down from top */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
          <button
            onClick={() => {
              /* placeholder: navigate to detail or open modal */
              window.location.href = `/product/${product.id}`;
            }}
            className="mt-3 z-10 pointer-events-auto bg-white/90 text-crumble-chocolate px-4 py-2 rounded-full shadow-md transform -translate-y-full group-hover:translate-y-0 transition-all duration-300"
          >
            Detalles
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="font-medium text-lg mb-1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h3>

        <p className="text-sm opacity-70 mb-3">S/. {product.price}</p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-crumble-chocolate text-white py-2 rounded-lg hover:bg-crumble-rose hover:text-crumble-dark transition mt-auto"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
