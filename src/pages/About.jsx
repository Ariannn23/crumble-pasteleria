import { useScrollAnimation } from "../hooks/useScrollAnimation";

import managerImg from "../assets/bakery_manager_man_1768949590829.png";
import chefImg from "../assets/bakery_chef_woman_1768949547936.png";
import bakerImg from "../assets/bakery_baker_man_1768949562425.png";
import serverImg from "../assets/bakery_server_woman_1768949577434.png";
import buildingImg from "../assets/foto_negocio.png";

const TeamMember = ({ name, role, image }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group">
    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-crumble-champagne group-hover:border-crumble-primary transition-colors duration-300 shadow-md">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <h3 className="font-heading text-xl text-crumble-dark mb-1">{name}</h3>
    <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">
      {role}
    </p>
  </div>
);

const About = () => {
  const historyRef = useScrollAnimation();
  const teamRef = useScrollAnimation();

  const team = [
    {
      name: "Carlos Ruiz",
      role: "Gerente General",
      image: managerImg,
    },
    {
      name: "Maria Fernández",
      role: "Chef Pastelera",
      image: chefImg,
    },
    {
      name: "Juan Pérez",
      role: "Maestro Panadero",
      image: bakerImg,
    },
    {
      name: "Lucía Gómez",
      role: "Atención al Cliente",
      image: serverImg,
    },
  ];

  return (
    <div className="page-transition min-h-screen bg-[#ffe8d6] pt-24 pb-16">
      {/* HISTORIA / NOSOTROS */}
      <section ref={historyRef} className="scroll-fade-up px-6 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl text-crumble-dark">
              Nuestra Historia
            </h2>
            <div className="h-1 w-24 bg-crumble-primary rounded-full"></div>
            <p className="text-gray-600 leading-relaxed font-light text-lg">
              En <span className="font-bold text-crumble-rose">Crumble</span>,
              la repostería es más que mezclar ingredientes; es el arte de crear
              momentos inolvidables. Nacimos con la pasión de llevar a tu mesa
              postres que no solo endulcen tu paladar, sino que también toquen
              tu corazón.
            </p>
            <p className="text-gray-600 leading-relaxed font-light">
              Desde nuestros clásicos Alfajores hasta nuestras innovadoras
              Tortas de Chocolate, cada creación es un homenaje a la tradición
              artesanal, elaborada con insumos de primera calidad y ese toque
              casero que nos distingue.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src={buildingImg}
              alt="Fachada Crumble"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* NUESTRO EQUIPO */}
      <section ref={teamRef} className="scroll-fade-up px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-crumble-dark mb-4">
              Nuestro Equipo
            </h2>
            <div className="h-1 w-24 bg-crumble-primary rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600 font-light max-w-2xl mx-auto">
              Conoce a los apasionados cocineros y reposteros que hacen magia en
              nuestra cocina cada día.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
