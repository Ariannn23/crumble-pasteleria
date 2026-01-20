import { useState, useEffect, useRef } from "react";
import { FiShoppingCart, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../cart/CartDrawer";
import logo from "../../assets/logo4.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { totalItems } = useCart();
  const [bump, setBump] = useState(false);
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    if (totalItems > prevTotal.current) {
      prevTotal.current = totalItems;
      setBump(true); // eslint-disable-line react-hooks/set-state-in-effect
      const t = setTimeout(() => setBump(false), 350);
      return () => clearTimeout(t);
    }
    prevTotal.current = totalItems;
  }, [totalItems]);

  return (
    <>
      <header className="bg-crumble-chocolate text-white sticky top-0 z-50">
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
                <span className="block text-xs md:text-sm opacity-80">
                  Pastelería Artesanal
                </span>
              </div>
            </Link>

            {/* NAV DESKTOP */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link to="/" className="hover:text-crumble-rose">
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
              <div className="relative">
                <button
                  onClick={() => setCategoriesOpen((s) => !s)}
                  onMouseEnter={() => setCategoriesOpen(true)}
                  aria-expanded={categoriesOpen}
                  className="flex items-center gap-1 hover:text-crumble-rose"
                >
                  Categorías <FiChevronDown />
                </button>

                <div
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                  className={`absolute top-full left-0 mt-2 w-48 bg-crumble-chocolate shadow-lg overflow-hidden transform transition-all duration-200 origin-top ${
                    categoriesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {[
                    "Tortas",
                    "Cheesecakes",
                    "Postres",
                    "Dulces",
                    "Porciones",
                  ].map((cat) => (
                    <a
                      key={cat}
                      href={`/shop?category=${encodeURIComponent(cat)}`}
                      className="block px-5 py-2 text-sm text-white hover:text-crumble-rose transition-colors"
                    >
                      <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-crumble-rose after:transition-all after:duration-300 hover:after:w-full">
                        {cat}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

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
            </nav>

            {/* ICONOS MOBILE */}
            <div className="flex items-center gap-4 md:hidden">
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

              {/* MENU MOBILE */}
              <button onClick={() => setMobileMenuOpen(true)}>
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/40 z-50">
            <div className="absolute right-0 top-0 w-72 h-full bg-crumble-cream text-crumble-dark p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-heading text-xl">Menú</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <FiX size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-sm">
                <Link to="/">
                  {" "}
                  <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-crumble-rose after:transition-all after:duration-300 hover:after:w-full">
                    Inicio
                  </span>{" "}
                </Link>
                <Link to="/#nosotros">
                  {" "}
                  <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-crumble-rose after:transition-all after:duration-300 hover:after:w-full">
                    Nosotros
                  </span>{" "}
                </Link>

                <div>
                  <span className="font-medium">Categorías</span>
                  <div className="mt-2 ml-3 flex flex-col gap-2">
                    {[
                      "Tortas",
                      "Cheesecakes",
                      "Postres",
                      "Dulces",
                      "Porciones",
                    ].map((cat) => (
                      <a
                        key={cat}
                        href={`/shop?category=${encodeURIComponent(cat)}`}
                        className="text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-crumble-rose after:transition-all after:duration-300 hover:after:w-full">
                          {cat}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <Link to="/shop">Tiendas</Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* DRAWER DEL CARRITO */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
