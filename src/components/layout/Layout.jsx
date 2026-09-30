import Header from "./headre/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="w-full mx-auto xl:max-w-[min(96rem,calc(100vw-14rem))] flex flex-col px-4 md:px-0 grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
