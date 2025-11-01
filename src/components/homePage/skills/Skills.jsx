import HeaderTittel from "../../krkba/HeaderTittel";
import MySkills from "./MySkills";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function Skills() {
  const { containerVariants } = useAnimationStore();
  let tittle = "skills";
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
        <MySkills />
      </motion.div>
    </>
  );
}
