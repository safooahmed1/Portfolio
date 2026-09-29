import { Link, useLocation } from "react-router-dom";
import Swap from "./Swap";
//img
import logoF from "../../../assets/logo/logoF.png";

export default function NavbarXl({ links }) {
  const location = useLocation();
  return (
    <>
      <div className="w-screen bg-[var(--surface)] pb-4 text-[var(--fg)] hidden md:flex flex-row justify-between md:pt-8">
        <div className="flex gap-2 h-5 items-center">
          <img src={logoF} alt="SAFOO" className="w-4 h-4" />
          <p className="font-bold text-[16px]">SAFOO</p>
        </div>
        <nav className="md:flex bg-[var(--surface)] hidden gap-8">
          {links.map((el) => {
            const isActive = location.pathname === el.path;
            return (
              <Link
                key={el.path}
                to={el.path}
                className={
                  isActive
                    ? "font-medium text-[var(--fg)]"
                    : "font-normal text-[var(--muted)] hover:text-[var(--fg)]"
                }
              >
                <span className="text-[var(--accent)] ">#</span>
                {el.name}
              </Link>
            );
          })}
          <span className="font-normal text-[var(--fg)] hover:text-[var(--accent)]">
            <Swap />
          </span>
        </nav>
      </div>
    </>
  );
}
