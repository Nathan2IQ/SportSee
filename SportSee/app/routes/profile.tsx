import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SportSee - Profil" },
    { name: "description", content: "Profil utilisateur" },
  ];
}

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      {/* Votre contenu de profil ici */}
    </div>
  );
}
