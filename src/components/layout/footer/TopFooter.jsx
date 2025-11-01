import logo from "../../../assets/logo/logoF.png";
import discord from "../../../assets/logo/discord.png";
import linkdin from "../../../assets/logo/linkdin.png";
import githup from "../../../assets/logo/githup.png";

export default function TopFooter() {
  return (
    <>
      <div className="">
        <div className="flex justify-between ">
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              {/* logo */}
              <div className="flex items-center gap-2 h-5">
                <img src={logo} alt="" className="w-4 h-4" />
                <h1 className="font-bold text-[16px]">SAFOO</h1>
              </div>
              {/* emil */}
              <div>
                <h4 className="text-[#ABB2BF]">safoo468@icloud.com</h4>
              </div>
            </div>
            <p>front-end developer and Mechanical Engineer</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-medium ">Media</h3>
            <div className="flex flex-row items-center gap-2">
              <img src={discord} className="" />
              <img src={linkdin} className="" />
              <img src={githup} className="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
