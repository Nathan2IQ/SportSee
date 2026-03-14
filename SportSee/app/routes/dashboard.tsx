// @ts-ignore
import { api } from "../utils/api";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SportSee - Dashboard" },
    { name: "description", content: "Tableau de bord utilisateur" },
  ];
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenue sur votre tableau de bord !</p>
    </div>
  );
}
