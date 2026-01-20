import { useMemo, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { products } from "../data/products";

const Products = ({ showHeading = true, limit }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
    );

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "price-asc") list = list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = list.sort((a, b) => b.price - a.price);
    if (sort === "name-asc")
      list = list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [query, category, sort]);

  const items = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  const grid = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  // Si no se muestra el heading, devolver solo el grid sin wrapper
  if (!showHeading) {
    return grid;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {showHeading && (
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="font-heading text-3xl">Nuestros productos</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm opacity-70">
              {filtered.length} productos
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className="px-3 py-1.5 border rounded text-sm w-48"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-1.5 border rounded text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 border rounded text-sm"
            >
              <option value="default">Ordenar</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name-asc">Nombre: A-Z</option>
            </select>
          </div>
        </div>
      )}

      {grid}
    </section>
  );
};

export default Products;
