import { useAnimationStore } from "../../store/indexAnimation";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import ButtonViewAll from "./ButtonViewAll";

export default function HeaderTittel({ tittle }) {
  const { containerVariants, zoomIn } = useAnimationStore();
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex justify-between items-center"
          variants={zoomIn}
        >
          <div className="flex items-center gap-4 w-8/12">
            <h2 className="text-[32px] font-medium whitespace-nowrap ">
              <Link to={"/work"}>
                <span className="text-[#C778DD] text-[32px] font-medium">
                  #
                </span>
                {tittle}
              </Link>
            </h2>
            <span className="bg-[#C778DD] h-px w-full"></span>
          </div>
          {tittle == "skills" ? null : (
            <ButtonViewAll tittle={tittle} />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
