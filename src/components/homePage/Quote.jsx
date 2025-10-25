import coma from "../../assets/coma.png";

export default function Quote() {
  return (
    <div className="flex justify-center mt-20 ">
      <div className="relative flex flex-col items-end">
        <div className="border-[1px] border-[#ABB2BF] flex items-center justify-center relative w-fit p-6">
          <img
            src={coma}
            className="absolute left-8 top-[-20px] p-2 bg-[#282C33]"
          />
          <img
            src={coma}
            className="absolute bottom-[-20px] right-8 p-2 bg-[#282C33]"
          />
          <p className="text-[24px] font-medium text-white ">
            With great power comes great electricity bill
          </p>
        </div>
        <div className="border-[1px] border-t-0 border-[#ABB2BF] flex items-center justify-center w-fit p-6 ">
          <p className="text-[24px] font-medium text-white ">- Dr. Who</p>
        </div>
      </div>
      <div className=" right-0">
      </div>
    </div>
  );
}
