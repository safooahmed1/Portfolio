import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function Box({ el, index }) {
  const { slideFromBottom } = useAnimationStore();
  return (
    <>
      <motion.div
        variants={slideFromBottom}
        className="border border-[#ABB2BF] flex flex-col pb-4 min-h-[400px]"
      >
        <div className="w-full border-b border-[#ABB2BF]">
          <img src={el.img || img} alt="" />
        </div>
        {/* contant */}
        <div className="flex flex-col gap-4 justify-around h-full pt-8">
          <h2 className=" text-[24px] font-medium px-5">{el.name}</h2>
          <p className="px-5 text-[#ABB2BF] ">{el.dis}</p>
          {/* button */}
          <div className="flex gap-5 px-5">
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
                <Link
                  to={el.github}
                  className="text-white flex items-center gap-2"
                >
                  Repo <HiOutlineArrowNarrowRight />
                </Link>
              </span>
            </motion.button>
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
                <Link
                  to={el.live}
                  className="text-white flex items-center gap-2"
                >
                  Live <HiOutlineArrowNarrowRight />
                </Link>
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
