import HeroSec1 from "./HeroSec1";
import HeroSec2 from "./HeroSec2";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function Hero() {
  const { containerVariants } = useAnimationStore();
  return (
    <motion.div
      className="flex flex-col md:flex-row md:grid-cols-2 mt-10 items-center"
      variants={containerVariants}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true, amount: 0.2 }}
    >
      <HeroSec1 />
      <HeroSec2 />
    </motion.div>
  );
}
