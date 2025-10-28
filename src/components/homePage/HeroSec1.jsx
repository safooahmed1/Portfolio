import logo from "../../assets/logo/logo.png";
import dots from "../../assets/logo/dots.png";
import logoB from "../../assets/logo/logoB.png";
import prson from "../../assets/Image.png";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useAnimationStore } from "../../store/indexAnimation";

export default function HeroSec1() {
  const {
    containerVariants,
    slideFromLeft,
    zoomIn,
    slideFromRight,
    slideFromBottom,
  } = useAnimationStore();
  return (
    <>
      <motion.div
        className="flex flex-col md:flex-row md:grid-cols-2 mt-10 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1*/}
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
            He crafts responsive websites where technologies meet creativity
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

        {/* 2*/}
        <motion.div
          className="relative w-full md:w-7/12 aspect-square mx-auto md:mx-0 md:ml-auto"
          variants={slideFromRight}
        >
          <motion.img
            src={logoB}
            className="absolute top-1/4 left-0 md:left-10 w-[120px] md:w-50"
            variants={zoomIn}
          />
          <motion.img
            src={prson}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
            variants={zoomIn}
          />
          <motion.img
            src={dots}
            className="absolute bottom-1/9 right-4 md:w-30"
            variants={zoomIn}
          />

          {/* card */}
          <motion.div
            className="border border-[#ABB2BF] flex items-center gap-2.5 absolute w-full bottom-0 md:bottom-5 bg-[#282C33] p-2"
            variants={slideFromBottom}
          >
            <div className="w-4 h-4 bg-[#C778DD]"></div>
            <h3 className="w-[278px] md:w-full font-medium text-[#ABB2BF]">
              Currently working on{" "}
              <span className="text-white font-semibold">Portfolio</span>
            </h3>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
