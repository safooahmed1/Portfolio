import group from "../../../assets/Group 36.png";
import { useSkills } from "../../../store";
import SkillMap from "./SkillMap";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function MySkills() {
  const { skills } = useSkills();
  const { containerVariants, slideFromLeft } = useAnimationStore();
  return (
    <>
      <motion.div
        variants={containerVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row md:justify-between w-12/12 "
      >
        <motion.div className="hidden md:flex w-4/12" variants={slideFromLeft}>
          <img src={group} className="w-full" />
        </motion.div>
        <div className="flex gap-4 flex-col justify-end md:flex-row lg:w-5/12">
          {skills.map((el, index) => {
            return <SkillMap el={el} key={index} />;
          })}
        </div>
      </motion.div>
    </>
  );
}
