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
        className="border border-(--muted) flex flex-col overflow-hidden h-full"
      >
        <div className="w-full aspect-2/1 overflow-hidden mb-5">
          <img
            src={el.img}
            alt={el.name}
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>
        {/* contant */}
        <div className="flex flex-col flex-1 gap-2 p-5">
          <h2 className="text-[24px] font-medium">{el.name}</h2>
          <p className="text-(--muted) line-clamp-3">{el.dis}</p>
          {/* button */}
          <div className="flex gap-5 mt-auto">
            {github && <Btn name={btn1} to={github} />}
            {live && <Btn name={btn2} to={live} />}
          </div>
        </div>
      </motion.div>
    </>
  );
}
