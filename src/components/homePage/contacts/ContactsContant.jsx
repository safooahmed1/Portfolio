import discord from "../../../assets/logo/discord.png";
import mail from "../../../assets/logo/Email.png";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function ContactsContant() {
  const { containerVariants, slideFromBottom, slideFromRight } =
    useAnimationStore();
  return (
    <>
      <motion.div
        variants={containerVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-8"
      >
        <motion.p
          variants={slideFromRight}
          className="text-[16px] text-[var(--muted)] font-medium w-full md:w-5/12"
        >
          I’m interested in freelance opportunities. However, if you have other
          request or question, don’t hesitate to contact me
        </motion.p>
        <motion.div
          variants={slideFromBottom}
          className="flex gap-2 flex-col border border-[var(--muted)] text-[var(--muted)] p-5"
        >
          <h2 className="font-semibold text-[var(--fg)] text-center pb-3">
            Message me here
          </h2>
          <h3 className="flex gap-3">
            <img src={discord} alt="Discord" />
            safo.o468
          </h3>
          <h3 className="flex gap-3">
            <img src={mail} alt="Email" />
            safoo468@icloud.com
          </h3>
        </motion.div>
      </motion.div>
    </>
  );
}
