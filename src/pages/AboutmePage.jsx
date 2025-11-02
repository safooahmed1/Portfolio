import AboutMePageComponant from "../components/aboutMePage/AboutMePageComponant";
import SkillsComponant from "../components/aboutMePage/SkillsComponant";
import MySkills from "../components/homePage/skills/MySkills";
import TitlePage from "../components/krkba/TitlePage";

export default function AboutmePage() {
  let title = "about-me";
  let paragraph = "who am i?";
  return (
    <>
      <div className="">
        <TitlePage title={title} paragraph={paragraph} />
        <AboutMePageComponant/>
        <SkillsComponant />
      </div>
    </>
  );
}
