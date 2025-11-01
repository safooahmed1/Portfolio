import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function SkillMap({ el }) {
  const { slideFromBottom } = useAnimationStore();
  return (
    <>
      <motion.div className="border border-[#ABB2BF] flex flex-col items-center h-fit"
       variants={slideFromBottom}>
        <h1 className="px-3 py-2 border-b border-[#ABB2BF] font-semibold w-full">
          {el.type}
        </h1>
        {/* skill */}
        <div className="px-3 py-2 flex gap-10 flex-wrap">
          {el.skill.map((el, index) => {
            return <span key={index}>{el}</span>;
          })}
        </div>
      </motion.div>
    </>
  );
}
