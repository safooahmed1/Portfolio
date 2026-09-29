import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function SkillMap({ el }) {
  const { slideFromBottom } = useAnimationStore();
  return (
    <>
      <motion.div
        className="border border-[var(--muted)] flex flex-col items-center h-fit"
        variants={slideFromBottom}
      >
        <h3 className="px-3 py-2 border-b border-[var(--muted)] font-semibold w-full">
          {el.type}
        </h3>
        {/* skill */}
        <div className="px-3 py-2 flex gap-3 flex-wrap text-[var(--muted)]">
          {el.skill.map((el, index) => {
            return <span key={index}>{el}</span>;
          })}
        </div>
      </motion.div>
    </>
  );
}
