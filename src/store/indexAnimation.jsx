import { create } from "zustand";

export const useAnimationStore = create(() => ({
  // Variants للكونتينر الرئيسي
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },

  // Variants للعناصر اللي جاية من الشمال
  slideFromLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  // Variants للعناصر اللي جاية من اليمين
  slideFromRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  // Variants للعناصر اللي بتطلع من تحت
  slideFromBottom: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },

  // Variants للعناصر اللي بتطلع من فوق
  slideFromTop: {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },

  // Variants للصور (مع zoom effect)
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },
}));

// طريقة التشغيل
// Variants للكونتينر الرئيسي
// <motion.div
//    variants={containerVariants}
//    initial="hidden"
//    whileInView="visible"
//    viewport={{ once: true, amount: 0.2 }}
// ><motion.div/>

// Variants لاي عناصر جيا من اي حتة
// <motion.p variants={الانماشن اللي انت عيزه} ><motion.p/>

// للاستدعاء
// import { motion } from "motion/react"
// const {  } = useAnimationStore();
