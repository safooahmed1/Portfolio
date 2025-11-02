import { useAnimationStore } from "../../store/indexAnimation";
import { motion } from "motion/react";

export default function TitleComponent({ tittle1 }) {
  const { containerVariants, zoomIn } = useAnimationStore();
  return (
    <>
      <motion.div
        className="mt-20 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex justify-between items-center"
          variants={zoomIn}
        >
          <h2 className="text-[32px] font-medium whitespace-nowrap ">
            {tittle1 == "" ? null : (
              <span className="text-[#C778DD] text-[32px] font-medium">#</span>
            )}

            {tittle1}
          </h2>
        </motion.div>
      </motion.div>
    </>
  );
}
