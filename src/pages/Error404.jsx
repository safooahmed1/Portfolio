import { motion } from "motion/react";
import { useAnimationStore } from "../store/indexAnimation";

export default function Error404() {
  const { zoomIn, containerVariants } = useAnimationStore();
  return (
    <>
      <motion.div
        variants={containerVariants}
        animate="visible"
        initial="hidden"
        className="text-gray-500 text-5xl h-screen w-full flex justify-center items-center"
      >
        <motion.h1 variants={zoomIn}>404 | NOT FOUND</motion.h1>
      </motion.div>
    </>
  );
}
