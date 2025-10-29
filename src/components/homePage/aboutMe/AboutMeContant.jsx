import pic2 from "../../../assets/Image2.png";
import dots from "../../../assets/logo/dots.png";
import { motion } from "motion/react";
import { useAnimationStore } from "../../../store/indexAnimation";

export default function AboutMeContant() {
  const { zoomIn, slideFromRight, slideFromBottom } = useAnimationStore();
  return (
    <>
      <div className="flex flex-col md:flex-row items-center max-sm:gap-15">
        {/* 1 */}
        <div className="flex flex-col gap-8 text-xl font-medium text-[#ABB2BF] leading-[26px] md:w-5/12">
          <p>Hello, i’m Elias!</p>
          <p>
            I’m a self-taught front-end developer based in Kyiv, Ukraine. I can
            develop responsive websites from scratch and raise them into modern
            user-friendly web experiences.
          </p>
          <p>
            Transforming my creativity and knowledge into a websites has been my
            passion for over a year. I have been helping various clients to
            establish their presence online. I always strive to learn about the
            newest technologies and frameworks.
          </p>
        </div>
        {/* 2 */}
        <motion.div
          className="relative w-full md:w-3/12 aspect-square mx-auto md:mx-0 md:ml-auto "
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
      </div>
    </>
  );
}
