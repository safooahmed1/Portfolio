import TitleComponent from "../krkba/TitleComponent";
import BoxProject from "./BoxProject";

export default function Projects() {
  let tittle1 = "complete-apps";
  let tittle2 = "small-projects";
  return (
    <>
      <div className="mb-10">
        <TitleComponent tittle1={tittle1} />
        <BoxProject />
      </div>
    </>
  );
}
