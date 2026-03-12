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
    <div className="flex h-[calc(100vh-110px)]">
      {/* Section gauche - Formulaire de connexion */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <LoginForm />
      </div>

      {/* Section droite - Image */}
      <div className="w-1/2 h-full relative overflow-hidden">
        <img
          src="#"
          alt="Sport et fitness"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
