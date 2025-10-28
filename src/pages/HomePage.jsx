import Hero from "../components/homePage/Hero";
import Quote from "../components/homePage/Quote";
import AboutMe from "../components/homePage/aboutMe/AboutMe";
import ShortPro from "../components/homePage/projctsLine/ShortPro";
import Skills from "../components/homePage/skills/Skills";

export default function HomePage() {
  return (
    <>
      <div className="h-[5000px] flex flex-col gap-10">
        <Hero />
        <Quote />
        <ShortPro />
        <Skills />
        <AboutMe />
      </div>
    </>
  );
}
