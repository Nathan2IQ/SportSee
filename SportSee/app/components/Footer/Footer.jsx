import Logo from "../Logo/Logo";
import { useDataSource } from "../../utils/mockData";

export default function Footer() {
  const { dataSource, toggleDataSource } = useDataSource();

  return (
    <footer className="bg-white flex text-center justify-evenly items-center mt-10">
      <div className=" flex items-center gap-5 ml-10 mr-auto">
        <p>©Sportsee</p>
        <p>Tous droits réservés</p>
      </div>
      <div className="m-auto">
        <button
          onClick={toggleDataSource}
          className="px-4 py-2 rounded bg-[#B6BDFC] text-black cursor-pointer"
        >
          {dataSource === "api" ? "Mode API" : "Mode JSON"}
        </button>
      </div>
      <div className="flex gap-10 ml-auto mr-10 items-center">
        <p>Conditions générales</p>
        <p>Contact</p>
        <Logo />
      </div>
    </footer>
  );
}
