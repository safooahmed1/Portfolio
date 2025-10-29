import HeaderTittel from "../../krkba/HeaderTittel";
import MySkills from "./MySkills";

export default function Skills() {
  let tittle = "skills"
  return (
    <>
      <div className="mt-20 flex flex-col gap-20">
        <HeaderTittel tittle={tittle} />
        <MySkills />
      </div>
    </>
  )
}
