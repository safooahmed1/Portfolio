import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";
import pic2 from "../../../assets/Image2.png";
import dots from "../../../assets/logo/dots.png";

export default function AboutMeContant2() {
  const { zoomIn, slideFromRight } = useAnimationStore();
  return (
    <>
      <motion.div
        className="relative w-1/2 lg:w-3/12 aspect-square mx-auto md:mx-0 md:ml-auto "
        variants={slideFromRight}
      >
        <motion.img
          src={dots}
          className="absolute top-1/4 left-0 md:-left-5 w-[120px] md:w-30"
          variants={zoomIn}
        />
        <motion.img
          src={pic2}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full border-b border-[#C778DD]"
          variants={zoomIn}
        />
        <motion.img
          src={dots}
          className="absolute bottom-1/9 right-4 md:w-30"
          variants={zoomIn}
        />
      </motion.div>
    </>
  );
}
