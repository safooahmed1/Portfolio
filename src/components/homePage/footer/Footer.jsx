import logo from "../../../assets/logo/logoF.png";

export default function Footer() {
  return (
    <>
      <div>
        <div className="flex justify-between w-full py-8 border-t border-[#ABB2BF]">
          <div className="">
            <h3>Media</h3>
            <div>
              {/* <img src={} alt="" />
              <img src={} alt="" />
              <img src={} alt="" /> */}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              {/* logo */}
              <div className="flex gap-2 h-5 items-center ">
                <img src={logo} alt="" className="w-4 h-4  " />
                <h1 className="font-bold text-[16px]">SAFOO</h1>
              </div>
              {/* emil */}
              <div>
                <h4 className="text-[#ABB2BF]">safoo468@icloud.com</h4>
              </div>
            </div>
            <p>front-end developer and Mechanical Engineer</p>
          </div>
        </div>
      </div>
    </>
  );
}
