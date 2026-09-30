import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";
import { useProjcts } from "../../../store";
import Box from "./Box";

export default function BoxShortPro() {
  const { shortProjcts } = useProjcts();
  const { containerVariants } = useAnimationStore();
  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-10 "
        whileInView="visible"
        variants={containerVariants}
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
      >
        {shortProjcts.map((el, index) => {
          return <Box el={el} key={index} />;
        })}
      </motion.div>
    </>
  );
}
