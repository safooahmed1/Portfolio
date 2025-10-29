import HeaderTittel from "../../HeaderTittel";
import AboutMeContant from "./AboutMeContant";

export default function AboutMe() {
  let tittle = "about-me";
  return (
    <>
      <div className="mt-20 flex flex-col gap-20">
        <HeaderTittel tittle={tittle} />
        <AboutMeContant />
      </div>
    </>
  );
}
