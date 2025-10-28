import { create } from "zustand";
import pic1 from "../assets/projcts/pro1.png";
import pic2 from "../assets/projcts/pro2.png";
import pic3 from "../assets/projcts/pro3.png";
import pic5 from "../assets/projcts/pro5.png";

export const useProjcts = create(() => ({
  shortProjcts: [
    {
      name: "EWatch",
      img: pic1,
      dis: "The eWatch with newest technology",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/EWatch.jsx",
      live: "https://site-compilation.vercel.app/eWatch",
    },
    {
      name: "Coffee",
      img: pic2,
      dis: "What's next in your space travel",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/Coffee.jsx",
      live: "https://site-compilation.vercel.app/coffee",
    },
    {
      name: "The Creative Gateway",
      img: pic3,
      dis: "Design, Create, Inspire.",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/TheCreativeGateway.jsx",
      live: "https://site-compilation.vercel.app/TheCreativeGateway",
    },
    {
      name: "Healthy Food",
      img: pic5,
      dis: "A place you eat healthy",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/HealthyFood.jsx",
      live: "https://site-compilation.vercel.app/healthyFood",
    },
  ],
}));

export const usdLoader = create((set) => ({
  index: false,
  setLoader: {},
}));

export const useSkills = create(() => ({
  skills: [
    { type: "Languages", skill: [] },
    { type: "Tools", skill: [] },
    { type: "Frameworks", skill: [] },
    { type: "Other", skill: [] },
  ],
}));
