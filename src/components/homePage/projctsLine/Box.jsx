import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";
import Btn from "../../krkba/Btn";

export default function Box({ el }) {
  const { slideFromBottom } = useAnimationStore();
  let btn1 = "Repo";
  let btn2 = "Live";
  let live = el.live;
  let github = el.github;
  return (
    <>
      <motion.div
        variants={slideFromBottom}
        className="border border-[#ABB2BF] flex flex-col min-h-[400px] overflow-hidden"
      >
        <div className="border-b border-[#ABB2BF] w-full h-73 md:h-75 overflow-hidden">
          <img
            src={el.img || img}
            className="w-full h-auto object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>
        {/* contant */}
        <div className="flex flex-col justify-around h-full py-5">
          <h2 className=" text-[24px] font-medium px-5">{el.name}</h2>
          <p className="px-5 text-[#ABB2BF] ">{el.dis}</p>
          {/* button */}
          <div className="flex gap-5 px-5">
            <Btn name={btn1} to={github} />
            <Btn name={btn2} to={live} />
          </div>
        </div>
      </motion.div>
    </>
  );
}
