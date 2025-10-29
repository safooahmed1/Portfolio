import BoxShortPro from "./BoxShortPro";
import HeaderTittel from "../../krkba/HeaderTittel";

export default function ShortPro() {
  let tittle = "projects";
  return (
    <>
      <div className="mt-20 flex flex-col gap-20 ">
        <HeaderTittel tittle={tittle} />
        <BoxShortPro />
      </div>
    </>
  );
}
