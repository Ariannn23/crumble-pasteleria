import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

const SocialBubbles = () => {
  return (
    <div className="fixed right-6 bottom-8 z-40 flex flex-col gap-4">
      <a
        href="https://wa.me/51999999999"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 transform"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>

      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 transform"
        aria-label="Facebook"
      >
        <FaFacebookF size={26} />
      </a>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 transform"
        aria-label="Instagram"
      >
        <FaInstagram size={28} />
      </a>
    </div>
  );
};

export default SocialBubbles;
