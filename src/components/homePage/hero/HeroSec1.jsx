import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function HeroSec1() {
  const { slideFromLeft } = useAnimationStore();
  return (
    <>
      <div className="flex flex-col gap-6 centered w-full">
        <motion.h1
          className="w-full font-semibold text-4xl lg:text-5xl md:leading-[65px]"
          variants={slideFromLeft}
        >
          Safoo is a
          <span className="text-[#C778DD]"> front-end developer </span>and
          <span className="text-[#C778DD]"> Mechanical Engineer</span>
        </motion.h1>

        <motion.p
          className="text-[#ABB2BF] text-[16px] md:w-6/12"
          variants={slideFromLeft}
        >
          He developer responsive websites where technologies meet evolution
        </motion.p>

        <motion.div variants={slideFromLeft}>
          <motion.button
            className="relative w-fit px-4 py-2 border font-medium border-[#C778DD] overflow-hidden"
            whileHover="hover"
            initial="initial"
          >
            <motion.span
              className="absolute inset-0 bg-[#C778DD]"
              variants={{
                initial: { x: "-100%" },
                hover: { x: 0 },
              }}
              transition={{
                duration: 0.1,
                ease: "easeOut",
              }}
            />
            <span className="relative z-10">
              <Link to={"/contacts"} className="text-white">
                Contact me!!
              </Link>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
