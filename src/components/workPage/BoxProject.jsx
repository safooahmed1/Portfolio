import { motion } from "motion/react";
import Box from "../homePage/projctsLine/Box";
import { useAnimationStore } from "../../store/indexAnimation";
import { useProjcts } from "../../store";

export default function BoxProject() {
  const { projcts } = useProjcts();
  const { containerVariants } = useAnimationStore();
  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full justify-items-center-safe gap-10 "
        whileInView="visible"
        variants={containerVariants}
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projcts.map((el, index) => {
          return <Box el={el} key={index} />;
        })}
      </motion.div>
    </>
  );
}
