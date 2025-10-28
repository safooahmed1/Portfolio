import { useAnimationStore } from "../store/indexAnimation";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function HeaderTittel({tittle}) {
  const { containerVariants, zoomIn } = useAnimationStore();
  return (
    <>
      <motion.div
        className=""
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex justify-between items-center"
        variants={zoomIn}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-[32px] font-medium">
              <Link to={"/work"}>
                <span className="text-[#C778DD] text-[32px] font-medium">
                  #
                </span>
                {tittle}
              </Link>
            </h2>
            <span className="bg-[#C778DD] h-px w-[800px] "></span>
          </div>
          <h3>
            <Link
              to={"/work"}
              className="font-medium text-[16px] flex items-center gap-3 hover:text-[#C778DD]"
            >
              View all <HiOutlineArrowNarrowRight />
            </Link>
          </h3>
        </motion.div>
      </motion.div>
    </>
  );
}
