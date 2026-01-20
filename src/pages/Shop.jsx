import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { products } from "../data/products";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categoryFromUrl || "All");

  // Actualizar categoría cuando cambia el parámetro URL
  useEffect(() => {
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
    );

    if (category !== "All") list = list.filter((p) => p.category === category);
    return list;
  }, [query, category]);

  return (
    <main className="min-h-screen bg-[#fff7ed] page-transition">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <header className="mb-6">
          <h1 className="text-4xl font-heading">Tienda</h1>
          <p className="text-gray-600 mt-2">Todo lo que preparamos</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <aside className="md:col-span-2">
            <div className="mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos"
                className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-crumble-primary focus:ring-2 focus:ring-crumble-primary/20 transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <h3 className="text-xs font-semibold text-crumble-dark mb-2 uppercase tracking-wide">
                Categorías
              </h3>
              <ul className="space-y-1">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setCategory(c)}
                      className={`text-left w-full px-2 py-1.5 text-sm rounded transition ${
                        category === c
                          ? "bg-crumble-cream font-medium"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="md:col-span-10">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Encontrado{" "}
                <span className="font-medium text-crumble-dark">
                  {filtered.length}
                </span>{" "}
                productos
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Shop;
