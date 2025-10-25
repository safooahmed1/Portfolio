//img
import logoF from "../../assets/logo/logoF.png";
//import local
import Swap from "./Swap";
import NavbarXl from "./NavbarXl.jsx";
import NavbarSm from "./NavbarSm.jsx";
//zustad
// import { linkS } from "../../store/index.jsx";
//react icone
import { MdHome } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";

export default function Header() {
  const links = [
    { name: "Home", path: "/", icon: <MdHome /> },
    { name: "Works", path: "/work", icon: <FaNetworkWired /> },
    { name: "About-Me", path: "/aboutME/", icon: <FaUser /> },
    { name: "contacts", path: "/contacts", icon: <BiSolidContact /> },
  ];

  return (
    <>
      <div className="">
        {/* navbar */}
        <NavbarXl links={links} />
        <NavbarSm links={links} />
      </div>
    </>
  );
}
