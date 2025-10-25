import Hero from "../components/homePage/Hero";
import Quote from "../components/homePage/Quote";

export default function HomePage() {
  return (
    <>
      <div className="h-[5000px] flex flex-col gap-10">
        <Hero />
        <Quote />
      </div>
    </>
  );
}
