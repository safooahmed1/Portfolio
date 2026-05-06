import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://portfolio-safooahmed1.vercel.app";
const siteName = "Safoo Portfolio";
const defaultDescription =
  "Saif Ahmed is a front-end developer and Mechanical Engineer based in Alexandria, Egypt, building responsive websites with React, Tailwind CSS, and modern web tools.";

const pages = {
  "/": {
    title: "Saif Ahmed | Front-End Developer",
    description: defaultDescription,
  },
  "/projects": {
    title: "Projects | Saif Ahmed",
    description:
      "Explore front-end projects by Saif Ahmed, including responsive React interfaces, landing pages, and modern web experiences.",
  },
  "/about-me": {
    title: "About Me | Saif Ahmed",
    description:
      "Learn more about Saif Ahmed, a front-end developer from Alexandria, Egypt with a Mechanical Engineering background.",
  },
  "/contacts": {
    title: "Contact | Saif Ahmed",
    description:
      "Contact Saif Ahmed for front-end development work, responsive websites, and React web projects.",
  },
};

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);

    if (match) {
      element.setAttribute(match[1], match[2]);
    }

    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname] || {
      title: "Page Not Found | Saif Ahmed",
      description: "The page you are looking for could not be found.",
    };
    const canonicalUrl = `${siteUrl}${pathname === "/" ? "" : pathname}`;

    document.title = page.title;
    setCanonical(canonicalUrl);
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('meta[name="robots"]', "content", "index, follow");
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:site_name"]', "content", siteName);
    setMeta('meta[name="twitter:title"]', "content", page.title);
    setMeta(
      'meta[name="twitter:description"]',
      "content",
      page.description
    );
  }, [pathname]);

  return null;
}
