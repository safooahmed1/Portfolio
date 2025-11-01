import { Link, useLocation } from "react-router-dom";

export default function NavbarSm({ links }) {
  const location = useLocation();
  return (
    <>
      <div className="">
        <nav className="md:hidden  bg-[#282C33] dock">
          {links.map((el) => {
            const isActive = location.pathname === el.path;
            return (
              <Link
                key={el.path}
                to={el.path}
                className={
                  isActive
                    ? "dock-active"
                    : "font-normal text-[#ABB2BF] hover:text-white"
                }
              >
                <div className="size-[1.2em]">{el.icon}</div>
                <div className="dock-label">{el.name}</div>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
