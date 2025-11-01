import dots from "../../assets/logo/dots.png";
import { motion } from "motion/react";
import { useAnimationStore } from "../../store/indexAnimation";

export default function Dots2() {
  const { containerVariants, slideFromLeft } = useAnimationStore();
  return (
    <div className="fixed left-5 bottom-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img src={dots} variants={slideFromLeft} />
      </motion.div>
    </div>
  );
}
