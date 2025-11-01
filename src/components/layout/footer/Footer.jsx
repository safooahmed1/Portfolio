import TopFooter from "./TopFooter";

export default function Footer() {
  return (
    <div className="border-t border-[#ABB2BF]">
      <div className="container mx-auto flex flex-col gap-12 px-4 md:px-0 py-8">
        <TopFooter />
        <div className="text-center text-[#ABB2BF]">© Copyright 2025. Design by Elias <br />Made by Safoo</div>
      </div>
    </div>
  );
}
