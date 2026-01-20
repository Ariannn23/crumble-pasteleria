import { FiShoppingCart, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevenir navegación al hacer click en el botón
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Imagen */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Botón de ver detalles (ojo) */}
        <Link
          to={`/product/${product.id}`}
          className="absolute top-2 right-2 bg-white/90 text-crumble-primary p-2 rounded-full shadow-lg hover:bg-crumble-primary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          aria-label={`Ver detalles de ${product.name}`}
        >
          <FiEye size={18} />
        </Link>
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Nombre del producto */}
        <h3 className="font-heading text-lg mb-2 text-crumble-dark truncate">
          {product.name}
        </h3>

        {/* Precio y Botón */}
        <div className="flex items-center justify-between">
          {/* Precio con estilo de ticket */}
          <div className="relative">
            <div className="bg-gradient-to-r from-crumble-primary to-crumble-rose text-white px-3 py-1 rounded-sm shadow-md opacity-90 ticket-badge">
              <span className="text-sm font-bold">
                S/. {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Botón Añadir */}
          <button
            onClick={handleAddToCart}
            className="group/btn bg-crumble-dark text-white px-3 py-2 rounded-full hover:bg-crumble-primary transition-all duration-500 flex items-center gap-2 overflow-hidden"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <FiShoppingCart size={18} className="flex-shrink-0" />
            <span className="max-w-0 group-hover/btn:max-w-xs transition-all duration-500 overflow-hidden whitespace-nowrap text-sm font-medium">
              Agregar
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
