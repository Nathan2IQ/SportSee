import type { Route } from "./+types/home";
import LoginForm from "../components/LoginForm/LoginForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SportSee - Accueil" },
    { name: "description", content: "Bienvenue sur SportSee" },
  ];
}

export default function Home() {
  return (
    <>
      {/* Image de fond fixe sur toute la hauteur */}
      <div className="fixed top-0 right-0 w-1/2 h-screen z-0">
        <img
          src="/login_bg.jpg"
          alt="Sport et fitness"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex h-[calc(100vh-105px)] overflow-hidden">
        {/* Section gauche - Formulaire de connexion */}
        <div className="w-1/2 flex items-center justify-center">
          <LoginForm />
        </div>

        {/* Section droite - Texte par-dessus l'image */}
        <div className="w-1/2 flex items-end justify-end p-8">
          <div className="bg-white flex items-center justify-center w-90 h-20 p-4 rounded-4xl">
            <p className="text-[#0B23F4] text-center">
              Analysez vos performances en un clin d'oeil, suivez vos progrès et
              atteignez vos objectifs.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
