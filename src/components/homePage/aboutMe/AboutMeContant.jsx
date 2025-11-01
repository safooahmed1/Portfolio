import AboutMeContant1 from "./AboutMeContant1";
import AboutMeContant2 from "./AboutMeContant2";

export default function AboutMeContant() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center max-sm:gap-15">
        <AboutMeContant1 />
        <AboutMeContant2 />
      </div>
    </>
  );
}
