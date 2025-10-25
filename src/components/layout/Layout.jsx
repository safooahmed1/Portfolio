import Dots2 from "./Dots2";
import Dots1 from "./Dots1";
import Square2 from "./Square2";
import Square1 from "./Square1";
import Linkat from "./Linkat";
import { motion } from "motion/react";
import { useAnimationStore } from "../../store/indexAnimation";

export default function Layout() {
  const { containerVariants } = useAnimationStore();
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex"
      >
        <Linkat />
        <Square1 />
        <Square2 />
        <Dots2 />
        <Dots1 />
      </motion.div>
    </>
  );
}
