import githup from "../../assets/logo/githup.png";
import discord from "../../assets/logo/discord.png";
import linkdin from "../../assets/logo/linkdin.png";
import { motion } from "motion/react";
import { useAnimationStore } from "../../store/indexAnimation";

export default function Linkat() {
  const { containerVariants, slideFromTop } = useAnimationStore();
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="hidden md:flex flex-col fixed top-0 left-[17px] items-center gap-3 text-[var(--muted)]"
          variants={slideFromTop}
        >
          <div className="h-[191px] w-px bg-[var(--muted)] "></div>
          <div className="flex flex-col items-center gap-2">
            <a href="https://github.com/safooahmed1">
              <img src={githup} alt="GitHub" />
            </a>
            <img src={discord} alt="" />
            <a href="https://www.linkedin.com/in/saif-eldeen-ahmed-766a11237/">
              <img src={linkdin} alt="LinkedIn" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
