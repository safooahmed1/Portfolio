import { motion } from "motion/react";
import { useAnimationStore } from "../../store/indexAnimation";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useProjcts } from "../../store";
import Box from "./Box";

export default function BoxShortPro() {
  const { shortProjcts } = useProjcts();
  const { containerVariants, slideFromBottom } = useAnimationStore();
  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full justify-items-center-safe gap-10 "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {shortProjcts.map((el, index) => {
          return <Box el={el} index={index} />;
        })}
      </motion.div>
    </>
  );
}
