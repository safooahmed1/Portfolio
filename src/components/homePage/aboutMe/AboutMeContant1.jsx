import { useAnimationStore } from "../../../store/indexAnimation";
import { motion } from "motion/react";

export default function AboutMeContant1() {
     const {
        slideFromRight,
      } = useAnimationStore();
  return (
    <>
      <motion.div variants={slideFromRight} className="flex flex-col gap-8 text-xl font-medium text-[#ABB2BF] leading-[26px] md:w-5/12">
        <p>Hello, i’m Saif!</p>
        <p>
          I’m a front-end developer based in Alexandria, Egypt. I can
          develop responsive websites from scratch and raise them into modern
          user-friendly web experiences.
        </p>
        <p>
        I joined this field three years ago, dedicating my time and effort to mastering front-end development. My passion for technology stems from my academic background in Mechanical Power Engineering from the College of Engineering.
        </p>
      </motion.div>
    </>
  );
}
