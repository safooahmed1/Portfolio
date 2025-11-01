import Header from "./headre/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="container mx-auto flex flex-col px-4 md:px-0 grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
