import { motion } from "motion/react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Btn({ name, to }) {
  return (
    <>
      <div className="">
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
            <Link to={to} className="text-white flex items-center gap-2">
              {name}
              <HiOutlineArrowNarrowRight />
            </Link>
          </span>
        </motion.button>
      </div>
    </>
  );
}
