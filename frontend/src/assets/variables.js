import React from "react";
import { Icon } from "@iconify/react";
import { MdiInstagram } from "./icons/icons";

const platforms = [
  {
    id: 1,
    name: "Facebook",
    icon: <Icon icon="ic:baseline-facebook" />,
    colorClass: "facebookColor",
  },
  {
    id: 2,
    name: "Twitter",
    icon: <Icon icon="mdi:twitter" />,
    colorClass: "twitterColor",
  },
  {
    id: 3,
    name: "Instagram",
    icon: <Icon icon="mdi:instagram" />,
    alternativeIcon: <MdiInstagram />,
    colorClass: "instagramColor",
  },
  {
    id: 4,
    name: "Reddit",
    icon: <Icon icon="ic:baseline-reddit" />,
    colorClass: "redditColor",
  },
  {
    id: 5,
    name: "TikTok",
    icon: <Icon icon="ic:baseline-tiktok" />,
    colorClass: "tiktokColor",
  },
  {
    id: 6,
    name: "LinkedIn",
    icon: <Icon icon="mdi:linkedin" />,
    colorClass: "linkedinColor",
  },
];

const usageOptions = [
    "Browsing Content",
    "Posting Updates",
    "Messaging Friends and Family",
    "Following News and Trends",
    "Engaging with Communities",
    "Watching Videos",
    "Business or Branding",
    "Educational Purposes",
    "Entertainment and Leisure",
    "Research and Inspiration",
  ];

export { platforms, usageOptions };
