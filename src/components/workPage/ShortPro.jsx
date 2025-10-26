import BoxShortPro from "./BoxShortPro";
import HeaderSortPro from "./HeaderSortPro";

export default function ShortPro() {
  return (
    <>
      <div className="mt-20 flex flex-col gap-20 ">
        <HeaderSortPro />
        <BoxShortPro />
      </div>
    </>
  );
}
