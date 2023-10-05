import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://utkarshgoel.dev/",
  author: "Utkarsh Goel",
  desc: "Utkarsh's blog",
  title: "Utkarsh's blog",
  ogImage: "",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/utkarsh867",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/utkarsh867",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/javachipd",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Twitch",
    href: "https://twitch.tv/javachipped",
    linkTitle: `${SITE.title} on Twitch`,
    active: true,
  },
];
