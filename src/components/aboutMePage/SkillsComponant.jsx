import MySkills from "../homePage/skills/MySkills";
import TitleComponent from "../krkba/TitleComponent";

export default function SkillsComponant() {
  let tittle1 = "skills"
  return (
    <>
      <div className="my-15">
        <TitleComponent tittle1={tittle1} />
        <MySkills/>
      </div>
    </>
  )
}
