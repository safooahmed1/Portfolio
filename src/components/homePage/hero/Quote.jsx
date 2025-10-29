import { motion } from "motion/react";
import coma from "../../../assets/coma.png";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function Quote() {
  const { containerVariants, zoomIn } = useAnimationStore();
  return (
    <motion.div
      className=""
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex justify-center mt-20 " variants={zoomIn}>
        <div className="relative flex flex-col items-end">
          <div className="border border-[#ABB2BF] flex items-center justify-center relative w-fit p-6">
            <img
              src={coma}
              className="absolute left-8 -top-5 p-2 bg-[#282C33]"
            />
            <img
              src={coma}
              className="absolute -bottom-5 right-8 p-2 bg-[#282C33]"
            />
            <p className="text-[24px] font-medium text-white ">
              With great power comes great electricity bill
            </p>
          </div>
          <div className="border border-t-0 border-[#ABB2BF] flex items-center justify-center w-fit p-6 ">
            <p className="text-[24px] font-medium text-white ">- Dr. Who</p>
          </div>
        </div>
        <div className=" right-0"></div>
      </motion.div>
    </motion.div>
  );
}
