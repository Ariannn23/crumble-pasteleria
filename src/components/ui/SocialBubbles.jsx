import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

const SocialBubbles = () => {
  return (
    <div className="fixed right-4 bottom-6 z-20 flex flex-col gap-3">
      <a
        href="https://wa.me/51954222598"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg hover:scale-105 transition"
        aria-label="Facebook"
      >
        <FaFacebookF />
      </a>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
    </div>
  );
};

export default SocialBubbles;
