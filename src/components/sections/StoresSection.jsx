import { useState } from "react";
import { FiMapPin, FiClock, FiPhone, FiX } from "react-icons/fi";
import storeImage from "../../assets/store-placeholder.png";

const stores = [
  {
    id: 1,
    name: "Golf",
    address: "Av. El Golf 352",
    phone: "(044) 256 326",
    hours: "Lun - Dom: 10am a 10pm",
    mapQuery: "Av. El Golf 352, Trujillo, Peru",
  },
  {
    id: 2,
    name: "Larco",
    address: "Av. Larco 1008",
    phone: "(044) 256 326",
    hours: "Lun - Dom: 9am a 10pm",
    mapQuery: "Av. Larco 1008, Trujillo, Peru",
  },
  {
    id: 3,
    name: "Mall Plaza",
    address: "Av. Mansiche",
    phone: "(044) 256 326",
    hours: "Lun - Dom: 10am a 10pm",
    mapQuery: "Mall Plaza Trujillo, Peru",
  },
  {
    id: 4,
    name: "Open Plaza",
    address: "Open Plaza Trujillo",
    phone: "(044) 256 326",
    hours: "Lun - Dom: 10am a 10pm",
    mapQuery: "Open Plaza Trujillo, Peru",
  },
];

const MapModal = ({ store, onClose }) => {
  if (!store) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-[60] transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl overflow-hidden relative animate-scale-in">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-heading text-crumble-dark">
              Tienda {store.name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="h-[400px] w-full bg-gray-100">
            <iframe
              title={`Mapa ${store.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
          <div className="p-4 bg-gray-50 text-sm text-gray-600 flex justify-between items-center">
            <span className="flex items-center gap-2">
              <FiMapPin /> {store.address}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> {store.hours}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const StoresSection = () => {
  const [activeStore, setActiveStore] = useState(null);

  return (
    <section
      id="stores"
      className="min-h-screen bg-[#ffe8d6] relative pt-12 pb-16"
    >
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl mb-2 text-crumble-dark">
          Nuestras Tiendas
        </h2>
        <div className="h-1 w-24 bg-crumble-primary mx-auto rounded-full" />
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto px-4 font-light">
          Encuentra tu punto de dulzura más cercano.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* STORES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={storeImage}
                  alt={`Sede ${store.name}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-0 right-0 bg-[#5a2e2e] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  TRUJILLO
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 text-center">
                <h3 className="font-heading text-2xl text-crumble-dark mb-3">
                  {store.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-6 font-medium">
                  <p className="flex items-center justify-center gap-2">
                    <FiMapPin className="text-[#5a2e2e]" /> {store.address}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <FiPhone className="text-[#5a2e2e]" /> {store.phone}
                  </p>
                  <p className="flex items-center justify-center gap-2 text-xs">
                    <FiClock className="text-crumble-secondary" /> {store.hours}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveStore(store)}
                    className="block w-full bg-[#8B4513] hover:bg-[#6d360f] text-white font-bold py-2.5 rounded-full transition-all text-sm uppercase tracking-wide shadow-md hover:shadow-lg"
                  >
                    Ubicación
                  </button>
                  <a
                    href={`https://wa.me/51${store.phone.replace(/\D/g, "")}?text=Hola, quiero consultar sobre la tienda ${store.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-[#25D366] font-bold py-2 rounded-full border border-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-sm flex items-center justify-center gap-2"
                  >
                    Consultar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP MODAL */}
      {activeStore && (
        <MapModal store={activeStore} onClose={() => setActiveStore(null)} />
      )}
    </section>
  );
};

export default StoresSection;
