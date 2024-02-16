import React from "react";
import { Icon } from "@iconify/react";
import { MdiInstagram } from "./icons/icons";
import { makeStyles } from "@material-ui/core/styles";

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

const thoughts = [
    "I'm not good enough",
    "I'm not as good as others",
    "I'm not worthy",
    "I'm not capable",
    "I'm not lovable",
    "I'm not deserving",
    "I'm not safe",
    "I'm not secure",
    "I'm not in control",
    "I'm not enough",
    "I'm not important",
    "I'm not respected",
    "I'm not valued",
];

const stages = [
  "Platform",
  "Usage",
  "Thought",
  "Emotion",
  "Situation",
  "Thinking Traps",
  "Reframe",
  "Survey",
];


const useStyles = makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: '8px 0',
    },
    '& .MuiInput-underline:after': {
      // Bottom border when input is focused
      borderBottomColor: '#1e3765',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      // Bottom border when input is hovered (optional, if you want to change this as well)
      borderBottomColor: 'none', // Use a different color if you want
    },
  },
  inputLabel: {
    color: 'black', // Default color
    '&.Mui-focused': {
      color: '#fff', // Color when the input label is focused
    },
  },
  input: {
    color: 'black',
    '&:focus': {
      // Define styles for focused state if needed
    },
  },
});

export { platforms, usageOptions, stages, useStyles, thoughts };
