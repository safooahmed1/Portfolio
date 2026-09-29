import dots from "../../../assets/logo/dots.png";
import logoB from "../../../assets/logo/logoB.png";
import prson from "../../../assets/Image.png";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function HeroSec2() {
  const { zoomIn, slideFromRight, slideFromBottom } = useAnimationStore();
  return (
    <>
      <motion.div
        className="relative w-full md:w-7/12 aspect-square mx-auto md:mx-0 md:ml-auto"
        variants={slideFromRight}
      >
        <motion.img
          src={logoB}
          alt="SAFOO"
          className="absolute top-1/4 left-0 md:left-10 w-[120px] md:w-50"
          variants={zoomIn}
        />
        <motion.img
          src={prson}
          alt="Saif Ahmed, mechanical engineer and front-end developer"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
          variants={zoomIn}
        />
        <motion.img
          src={dots}
          alt=""
          className="absolute bottom-1/9 right-4 md:w-30"
          variants={zoomIn}
        />

        {/* card */}
        <motion.div
          className="border border-[var(--muted)] flex items-center gap-2.5 absolute w-full bottom-0 md:bottom-5 bg-[var(--surface)] p-2"
          variants={slideFromBottom}
        >
          <div className="w-4 h-4 bg-[var(--accent)]"></div>
          <h2 className="w-[278px] md:w-full font-medium text-[var(--muted)]">
            Currently working on{" "}
            <span className="text-[var(--fg)] font-semibold">Portfolio</span>
          </h2>
        </motion.div>
      </motion.div>
    </>
  );
}
