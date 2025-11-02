import AboutMeContant from "../homePage/aboutMe/AboutMeContant";
import TitleComponent from "../krkba/TitleComponent";

export default function AboutMePageComponant() {
  let tittle1 = "";
  return (
    <>
      <div className="">
        <TitleComponent tittle1={tittle1} />
        <AboutMeContant />
      </div>
    </>
  );
}
