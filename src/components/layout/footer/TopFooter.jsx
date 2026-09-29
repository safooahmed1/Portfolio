import logo from "../../../assets/logo/logoF.png";
import discord from "../../../assets/logo/discord.png";
import linkdin from "../../../assets/logo/linkdin.png";
import githup from "../../../assets/logo/githup.png";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function TopFooter() {
  const { containerVariants, slideFromRight, slideFromLeft } =
    useAnimationStore();
  return (
    <>
      <motion.div
        variants={containerVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row gap-5 justify-between"
      >
        <motion.div variants={slideFromLeft} className="flex flex-col gap-3">
          <div className="flex gap-5">
            {/* logo */}
            <div className="flex items-center gap-2 h-5">
              <img src={logo} alt="" className="w-4 h-4" />
              <p className="font-bold text-[16px]">SAFOO</p>
            </div>
            {/* emil */}
            <div>
              <p className="text-[var(--muted)]">safoo468@icloud.com</p>
            </div>
          </div>
          <p>front-end developer and Mechanical Engineer</p>
        </motion.div>
        <motion.div variants={slideFromRight} className="flex flex-col gap-2">
          <h3 className="text-2xl font-medium ">Media</h3>
          <div className="flex flex-row items-center gap-2">
            <img src={discord} alt="Discord" className="" />
            <img src={linkdin} alt="LinkedIn" className="" />
            <img src={githup} alt="GitHub" className="" />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
