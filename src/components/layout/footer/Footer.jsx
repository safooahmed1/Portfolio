import TopFooter from "./TopFooter";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-between w-full py-8 border-t border-[#ABB2BF]">
        <TopFooter />
        <div>© Copyright 2022. Made by Elias</div>
      </div>
    </>
  );
}
