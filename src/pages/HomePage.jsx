import Hero from "../components/homePage/hero/Hero";
import Quote from "../components/homePage/hero/Quote";
import AboutMe from "../components/homePage/aboutMe/AboutMe";
import ShortPro from "../components/homePage/projctsLine/ShortPro";
import Skills from "../components/homePage/skills/Skills";
import Contacts from "../components/homePage/contacts/Contacts";

export default function HomePage() {
  return (
    <>
      <div className="mb-50 flex flex-col gap-10">
        <Hero />
        <Quote />
        <ShortPro />
        <Skills />
        <AboutMe />
        <Contacts />
      </div>
    </>
  );
}
