import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import logo from "../../assets/logo4.png";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const { totalItems } = useCart();
  const categoriasRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0 });

  useEffect(() => {
    if (totalItems > 0) {
      setBump(true);
      const timer = setTimeout(() => setBump(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  useEffect(() => {
    if (categoriesOpen && categoriasRef.current) {
      const rect = categoriasRef.current.getBoundingClientRect();
      setDropdownPosition({ left: rect.left });
    }
  }, [categoriesOpen]);

  return (
    <>
      <header className="bg-crumble-darker text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Crumble Pastelería"
                className="h-10 md:h-12 object-contain"
              />
              <div className="leading-tight">
                <span className="block font-heading text-xl md:text-2xl tracking-wide">
                  Crumble
                </span>
                <span className="block text-xs md:text-sm opacity-80 italic">
                  Pastelería Artesanal
                </span>
              </div>
            </Link>

            {/* NAV DESKTOP */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium ml-auto">
              <Link to="/" className="hover:text-crumble-peach">
                <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-crumble-rose after:transition-all after:duration-300 hover:after:w-full">
                  Inicio
                </span>
              </Link>
              <Link to="/shop" className="hover:text-crumble-rose">
                <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-crumble-rose after:transition-all after:duration-300 hover:after:w-full">
                  Productos
                </span>
              </Link>
              <a href="/#nosotros" className="hover:text-crumble-rose">
                <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-crumble-rose after:transition-all after:duration-300 hover:after:w-full">
                  Nosotros
                </span>
              </a>

              {/* CATEGORÍAS */}
              <button
                ref={categoriasRef}
                onClick={() => setCategoriesOpen((s) => !s)}
                onMouseEnter={() => setCategoriesOpen(true)}
                aria-expanded={categoriesOpen}
                className="flex items-center gap-1 hover:text-crumble-peach"
              >
                Categorías <FiChevronDown />
              </button>

              <Link to="/shop" className="hover:text-crumble-rose">
                <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-crumble-rose after:transition-all after:duration-300 hover:after:w-full">
                  Tiendas
                </span>
              </Link>
              {/* CARRITO DESKTOP */}
              <button onClick={() => setCartOpen(true)} className="relative">
                <FiShoppingCart size={22} />

                {totalItems > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 bg-crumble-rose text-crumble-dark text-xs w-5 h-5 rounded-full flex items-center justify-center transform transition-all ${
                      bump ? "scale-110" : "scale-100"
                    }`}
                  >
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* MOBILE BUTTONS */}
            <div className="md:hidden flex items-center gap-4">
              {/* MOBILE TOGGLE */}
              <button
                onClick={() => setMobileMenuOpen((s) => !s)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>

              {/* CARRITO MOBILE */}
              <button onClick={() => setCartOpen(true)} className="relative">
                <FiShoppingCart size={22} />
                {totalItems > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 bg-crumble-rose text-crumble-dark text-xs w-5 h-5 rounded-full flex items-center justify-center transform transition-all ${
                      bump ? "scale-110" : "scale-100"
                    }`}
                  >
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-crumble-dark border-t border-crumble-primary">
            <nav className="flex flex-col p-4 space-y-3 text-sm">
              <Link
                to="/"
                className="hover:text-crumble-rose"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/shop"
                className="hover:text-crumble-rose"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </Link>
              <a
                href="/#nosotros"
                className="hover:text-crumble-rose"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </a>
              <Link
                to="/shop"
                className="hover:text-crumble-rose"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tiendas
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* DROPDOWN DE CATEGORÍAS - FUERA DEL HEADER */}
      {dropdownPosition.left > 0 && (
        <div
          onMouseEnter={() => setCategoriesOpen(true)}
          onMouseLeave={() => setCategoriesOpen(false)}
          className={`fixed top-16 z-40 transition-all duration-300 ${
            categoriesOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{ left: `${dropdownPosition.left}px` }}
        >
          <div className="w-48 bg-crumble-dark shadow-lg">
            {["Tortas", "Cheesecakes", "Postres", "Dulces", "Porciones"].map(
              (cat) => (
                <Link
                  key={cat}
                  to={`/shop?category=${encodeURIComponent(cat)}`}
                  className="block w-full text-left px-4 py-2 text-white transition group"
                  onClick={() => setCategoriesOpen(false)}
                >
                  <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-crumble-rose after:transition-all after:duration-300 group-hover:after:w-full">
                    {cat}
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
