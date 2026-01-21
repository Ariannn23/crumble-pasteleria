import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { products } from "../data/products";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "Todos";

  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["Todos", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
    );

    if (category !== "Todos")
      list = list.filter((p) => p.category === category);
    return list;
  }, [query, category]);

  const handleCategoryChange = (newCategory) => {
    if (newCategory === "Todos") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: newCategory });
    }
  };

  return (
    <main className="min-h-screen bg-[#ffe8d6] page-transition">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <header className="mb-12">
          <h1 className="text-4xl font-heading text-crumble-dark mb-3">
            Tienda
          </h1>
          <div className="h-1 w-24 bg-crumble-primary rounded-full mb-4"></div>
          <p className="text-gray-600 font-light text-lg">
            Todo lo que preparamos con amor para ti.
          </p>
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
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCategoryChange(c)}
                    className={`text-left px-4 py-2 text-sm transition-all duration-300 font-medium whitespace-nowrap border rounded-tl-xl rounded-br-xl rounded-tr-none rounded-bl-none ${
                      category === c
                        ? "bg-crumble-primary text-white border-crumble-primary shadow-md transform scale-105" // Active state
                        : "bg-white text-gray-600 border-gray-200 hover:bg-crumble-rose/10 hover:border-crumble-rose hover:text-crumble-dark" // Inactive state
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
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
