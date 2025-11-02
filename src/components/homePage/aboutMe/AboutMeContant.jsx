import AboutMeContant1 from "./AboutMeContant1";
import AboutMeContant2 from "./AboutMeContant2";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function AboutMeContant() {
  const { containerVariants } = useAnimationStore();
  return (
    <>
      <motion.div
        variants={containerVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row items-center max-sm:gap-15"
      >
        <AboutMeContant1 />
        <AboutMeContant2 />
      </motion.div>
    </>
  );
}
