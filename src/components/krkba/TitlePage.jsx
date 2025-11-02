import { motion } from "motion/react";
import { useAnimationStore } from "../../store/indexAnimation";

export default function TitlePage({ title, paragraph }) {
  const { slideFromRight } = useAnimationStore();
  return (
    <>
      <motion.div
        whileInView="visible"
        variants={slideFromRight}
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col gap-4"
      >
        <h1 className="font-semibold text-[32px] ">
          <span className="text-[#C778DD]">/</span>
          {title}
        </h1>
        <p className="font-normal text-[16px]">{paragraph}</p>
      </motion.div>
    </>
  );
}
