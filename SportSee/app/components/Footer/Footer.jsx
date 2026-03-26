import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="bg-white flex text-center items-center mt-20">
      <div className=" flex items-center gap-5 ml-10">
        <p>©Sportsee</p>
        <p>Tous droits réservés</p>
      </div>
      <div className="flex gap-10 ml-auto mr-10 items-center">
        <p>Conditions générales</p>
        <p>Contact</p>
        <Logo />
      </div>
    </footer>
  );
}
