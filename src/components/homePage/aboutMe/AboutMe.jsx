import HeaderTittel from "../../krkba/HeaderTittel";
import AboutMeContant from "./AboutMeContant";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function AboutMe() {
   const {
      containerVariants,
    } = useAnimationStore();
  let tittle = "about-me";
  return (
    <>
      <motion.div
        className="mt-20 flex flex-col gap-20"
        variants={containerVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
      >
        <HeaderTittel tittle={tittle} />
        <AboutMeContant />
      </motion.div>
    </>
  );
}
