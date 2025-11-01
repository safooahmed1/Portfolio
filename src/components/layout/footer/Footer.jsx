import TopFooter from "./TopFooter";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function Footer() {
  const { containerVariants, slideFromBottom } = useAnimationStore();
  return (
    <div className="border-t border-[#ABB2BF] max-sm:pb-10">
      <motion.div
        variants={containerVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto flex flex-col gap-12 px-4 md:px-0 py-8"
      >
        <TopFooter />
        <motion.div
          variants={slideFromBottom}
          className="text-center text-[#ABB2BF]"
        >
          © Copyright 2025. Design by Elias <br />
          Made by Safoo
        </motion.div>
      </motion.div>
    </div>
  );
}
