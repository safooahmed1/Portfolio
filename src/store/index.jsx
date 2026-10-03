import { create } from "zustand";
import pic1 from "../assets/projcts/pro1.webp";
import pic2 from "../assets/projcts/pro2.webp";
import pic3 from "../assets/projcts/pro3.webp";
import pic4 from "../assets/projcts/pro4.webp";
import pic5 from "../assets/projcts/pro5.webp";
import pic6 from "../assets/projcts/pro6.webp";
import pic7 from "../assets/projcts/pro7.webp";
import pic8 from "../assets/projcts/pro8.webp";
import pic9 from "../assets/projcts/pro9.webp";
import pic11 from "../assets/projcts/watch.webp";
import picStander from "../assets/projcts/Pasted image.webp";
import Portfolio from "../assets/projcts/Portfolio.webp";

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
  projcts: [
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
      name: "Burgerz",
      img: pic4,
      dis: "Wake up your taste buds with this juicy bites",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/Burgerz.jsx",
      live: "https://site-compilation.vercel.app/burgerz",
    },
    {
      name: "Healthy Food",
      img: pic5,
      dis: "A place you eat healthy",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/HealthyFood.jsx",
      live: "https://site-compilation.vercel.app/healthyFood",
    },
    {
      name: "LoginPage",
      img: pic6,
      dis: "Login Responsive",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/LoginPage.jsx",
      live: "https://site-compilation.vercel.app/loginPage",
    },
    {
      name: "Nintando",
      img: pic7,
      dis: "Nintando Responsive, you can play on it",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/Nintando.jsx",
      live: "https://site-compilation.vercel.app/nintando",
    },
    {
      name: "Marwan Pablo",
      img: pic8,
      dis: "Artist Marwan Pablo",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/MarwanPablo.jsx",
      live: "https://site-compilation.vercel.app/marwan-pablo",
    },
    {
      name: "future",
      img: pic9,
      dis: "DESIGN THE FUTURE",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/Japan.jsx",
      live: "https://site-compilation.vercel.app/japan",
    },
    {
      name: "Watch",
      img: pic11,
      dis: "A perfect HomePage for e-commerce",
      github:
        "https://github.com/safooahmed1/Site-compilation/blob/main/src/pages/ErorrPage.jsx",
    },
    {
      name: "Site Compilation",
      img: picStander,
      dis: "On this site there is a collection of other sites developed by Saif Ahmed",
      github: "https://github.com/safooahmed1/Site-compilation",
      live: "https://site-compilation.vercel.app/",
    },
    {
      name: "Portfolio",
      img: Portfolio,
      dis: "This website",
      github: "https://github.com/safooahmed1/Portfolio",
    },
  ],
}));

export const useSkills = create(() => ({
  skills: [
    {
      type: "Languages",
      skill: ["JavaScript", "Python", "Arabic", "English", "Italian"],
    },
    {
      type: "Tools",
      skill: ["VSCode", "Fedora", "Linux", "Claude", "Git", "Strapi", "Gnome"],
    },
    { type: "Frameworks", skill: ["React"] },
    {
      type: "Other",
      skill: ["HTML", "CSS", "Tailwind CSS"],
    },
  ],
}));
