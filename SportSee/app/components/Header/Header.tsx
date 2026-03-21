import { Link } from "react-router";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-[#0B23F4] text-3xl font-bold">SPORTSEE</div>
        </Link>

        <nav className="flex bg-white  px-6 py-4 rounded-4xl items-center space-x-8">
          <Link to="/dashboard" className="text-black text-lg text-[14px] ">
            Dashboard
          </Link>
          <Link to="/profile" className="text-black text-lg text-[14px] ">
            Mon profil
          </Link>
          <span className="text-black h-full">|</span>
          <Link
            to="/"
            className="text-[#0B23F4] text-lg text-[14px] "
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("userId");
              navigate("/");
            }}
          >
            Se déconnecter
          </Link>
        </nav>
      </div>
    </header>
  );
}
