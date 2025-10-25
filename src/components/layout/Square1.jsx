import square from "../../assets/logo/square.png";
import { motion } from "motion/react";
import { useAnimationStore } from "../../store/indexAnimation";

export default function Square1() {
  const { containerVariants, slideFromRight, slideFromLeft } =
    useAnimationStore();
  return (
    <div className="fixed top-50 right-[-15px] ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img src={square} variants={slideFromRight} />
      </motion.div>
    </div>
  );
}
