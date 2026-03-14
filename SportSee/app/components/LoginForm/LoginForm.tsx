import { useState } from "react";
import { useNavigate } from "react-router";
// @ts-ignore
import { api } from "../../utils/api";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await api.login(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      navigate("/dashboard");
    } catch (err) {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-[#0B23F4] mb-2">
          Transformez vos stats en résultats
        </h1>
        <p className="text-2xl pt-4">Se connecter</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
        )}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0B23F4] text-white py-4 rounded-lg font-bold text-lg cursor-pointer"
        >
          Se connecter
        </button>

        <div className="flex items-center justify-between">
          <a href="#" className="text-sm border-gray-300">
            Mot de passe oublié ?
          </a>
        </div>
      </form>
    </div>
  );
}
