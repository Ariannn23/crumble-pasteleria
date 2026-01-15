import { useMemo, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { products } from "../data/products";

const Shop = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    if (category !== "All") list = list.filter((p) => p.category === category);
    return list;
  }, [query, category]);

  return (
    <main className="min-h-screen bg-[#fff7ed]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-heading">Nuestra Tienda</h1>
          <p className="text-gray-600 mt-2">
            Todo lo que preparamos, en un solo lugar.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <aside className="md:col-span-3">
            <div className="mb-6">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-crumble-chocolate mb-3">
                CATEGORÍAS
              </h3>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setCategory(c)}    
                      className={`text-left w-full px-2 py-2 text-sm rounded ${
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

          <section className="md:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Encontrado{" "}
                <span className="font-medium text-crumble-chocolate">
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
