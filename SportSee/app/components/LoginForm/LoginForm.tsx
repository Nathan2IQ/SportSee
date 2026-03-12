export default function LoginForm() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-[#0B23F4] mb-2">
          Transformez vos stats en résultats
        </h1>
        <p className="text-2xl pt-4">Se connecter</p>
      </div>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            placeholder="exemple@email.com"
            required
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0B23F4] text-white py-4 rounded-lg font-bold text-lg "
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
