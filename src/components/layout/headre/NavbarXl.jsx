import { Link, useLocation } from "react-router-dom";
import Swap from "./Swap";
//img
import logoF from "../../../assets/logo/logoF.png";

export default function NavbarXl({ links }) {
  const location = useLocation();
  return (
    <>
      <div className="w-screen bg-[#282C33] pb-4 text-white hidden md:flex flex-row justify-between md:pt-8">
        <div className="flex gap-2 h-5 items-center">
          <img src={logoF} className="w-4 h-4" />
          <h1 className="font-bold text-[16px]">SAFOO</h1>
        </div>
        <nav className="md:flex bg-[#282C33] hidden gap-8">
          {links.map((el, index) => {
            const isActive = location.pathname === el.path;
            return (
              <Link
                key={el.path}
                to={el.path}
                className={
                  isActive
                    ? "font-medium text-whit"
                    : "font-normal text-[#ABB2BF] hover:text-white"
                }
              >
                <span className="text-[#C778DD] ">#</span>
                {el.name}
              </Link>
            );
          })}
          <span className="font-normal text-white hover:text-[#C778DD]">
            <Swap />
          </span>
        </nav>
      </div>
    </>
  );
}
