import { FiInstagram, FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/logo4.png";

const Footer = () => {
  return (
    <footer className="bg-[#630e0d] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* BRAND HEADER - CENTRADO ARRIBA */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl md:text-5xl font-heading tracking-widest text-white/90 mb-2">
            CRUMBLE
          </h2>
          <div className="flex items-center gap-4 text-[#faddc5] opacity-80">
            <div className="h-[1px] w-8 bg-[#faddc5]"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-light">
              Pastelería Artesanal
            </span>
            <div className="h-[1px] w-8 bg-[#faddc5]"></div>
          </div>
        </div>

        {/* COLUMNS ADDRESSES - LINKS - CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-start">
          {/* COL 1: ADDRESSES */}
          <div className="flex flex-col items-center space-y-3 text-sm font-light text-[#faddc5]">
            <p className="hover:text-white transition-colors">
              Av. El Golf 352
            </p>
            <p className="hover:text-white transition-colors">Av. Larco 1008</p>
            <p className="hover:text-white transition-colors">
              Av. América Norte 2272
            </p>
            <p className="hover:text-white transition-colors">
              Mall Plaza - Real Plaza
            </p>
            <p className="hover:text-white transition-colors">Open Plaza</p>
          </div>

          {/* COL 2: LEGAL LINKS */}
          <div className="flex flex-col gap-3 text-sm text-[#faddc5] items-center">
            <a
              href="#"
              className="hover:text-white hover:translate-x-1 transition-all duration-300 transform inline-block"
            >
              Términos y Condiciones
            </a>
            <a
              href="#"
              className="hover:text-white hover:translate-x-1 transition-all duration-300 transform inline-block"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="hover:text-white hover:translate-x-1 transition-all duration-300 transform inline-block"
            >
              Política de Cookies
            </a>
            <a
              href="#"
              className="hover:text-white hover:translate-x-1 transition-all duration-300 transform inline-block"
            >
              Libro de Reclamaciones
            </a>
          </div>

          {/* COL 3: CONTACT */}
          <div className="flex flex-col items-center space-y-4 text-sm">
            <h4 className="font-medium text-white/90">Contáctenos</h4>

            <div className="flex flex-col items-center gap-3 text-[#faddc5]">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <FaWhatsapp
                  className="text-[#25D366] group-hover:scale-110 transition-transform"
                  size={18}
                />
                <span>(044) 256 326</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <FaWhatsapp
                  className="text-[#25D366] group-hover:scale-110 transition-transform"
                  size={18}
                />
                <span>947732937</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-xs text-white/50">
            2025 Todos los derechos reservados. Diseño web:{" "}
            <a href="#" className="text-[#faddc5] hover:underline">
              www.sharkcorp.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
