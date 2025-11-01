//import local
import Swap from "./Swap";
import NavbarXl from "./NavbarXl.jsx";
import NavbarSm from "./NavbarSm.jsx";
//react icone
import { MdHome } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";

export default function Header() {
  const links = [
    { name: "Home", path: "/", icon: <MdHome /> },
    { name: "Works", path: "/projects", icon: <FaNetworkWired /> },
    { name: "About-Me", path: "/about-me", icon: <FaUser /> },
    { name: "contacts", path: "/contacts", icon: <BiSolidContact /> },
  ];

  return (
    <div className="">
      <div className="lg:bg-[#282C33] container mx-auto flex px-4 md:px-0 z-30">
        {/* navbar */}
        <NavbarXl links={links} />
        <NavbarSm links={links} />
      </div>
    </div>
  );
}
