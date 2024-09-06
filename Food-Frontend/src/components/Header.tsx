import { Link } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import MainNav from "./MainNav";
import logo from '../assets/LogoFood.png'; 

function Header() {
  return (
    <div className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="font-bold tracking-tight text-orange-500"
        >
          <img src={logo} alt="Logo" className="w-24 h-auto" />
        </Link>

        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
}

export default Header;
