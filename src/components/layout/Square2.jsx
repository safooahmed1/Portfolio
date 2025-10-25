import square from "../../assets/logo/square.png";
import { motion } from "motion/react";
import { useAnimationStore } from "../../store/indexAnimation";

export default function Square2() {
  const { containerVariants, slideFromRight, slideFromLeft } =
    useAnimationStore();
  return (
    <>
      <div className="fixed top-100 left-[-30px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img src={square} variants={slideFromLeft} />
        </motion.div>
      </div>
    </>
  );
}
