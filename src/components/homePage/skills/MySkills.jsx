import group from "../../../assets/Group 36.png";
import { useSkills } from "../../../store";
import SkillMap from "./SkillMap";

export default function MySkills() {
  const { skills } = useSkills();
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between w-12/12 ">
        <div className="hidden md:flex w-4/12">
          <img src={group} className="w-full" />
        </div>
        <div className="flex gap-4 flex-col md:flex-row md:w-5/12">
          {skills.map((el, index) => {
            return <SkillMap el={el} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
