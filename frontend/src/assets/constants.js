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
  "Thought",
  "Emotion",
  "Situation",
  "Distortion",
  "Reframe",
  "Survey",
];

const useStyles = makeStyles({
  root: {
    "& .MuiTextField-root": {
      margin: "8px 0",
    },
    "& .MuiInput-underline:after": {
      // Bottom border when input is focused
      borderBottomColor: "#1e3765",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      // Bottom border when input is hovered (optional, if you want to change this as well)
      borderBottomColor: "none", // Use a different color if you want
    },
  },
  inputLabel: {
    color: "black", // Default color
    "&.Mui-focused": {
      color: "#fff", // Color when the input label is focused
    },
  },
  input: {
    color: "black",
    "&:focus": {
      // Define styles for focused state if needed
    },
  },
});

const backendURL = process.env.backendURL || "http://localhost:8000";
const frontendURL = process.env.frontendURL || "http://localhost:3000";

const distortions = [
  "disqualifying the positive",
  "comparing and despairing",
  "personalizing",
  "should statements",
  "emotional reasoning",
  "catastrophizing",
  "labeling",
  "fortune telling",
  "blaming",
  "magnification",
  "negative feeling or emotion",
  "mind reading",
  "overgeneralizing",
  "all-or-nothing thinking",
];

const distortionDescriptions = {
  "disqualifying the positive":
    'When something good happens, you ignore it or think it doesn\'t count. "I only won because I got lucky."',
  "comparing and despairing": "Comparing your worst to someone else's best.",
  personalizing:
    'Taking things personally or making them about you. "He\'s quiet today. I wonder what I did wrong."',
  "should statements":
    'Setting unrealistic expectations for yourself. "I shouldn\'t need to ask for help. I should be independent."',
  "emotional reasoning":
    'Treating your feelings like facts. "I woke up feeling anxious. I just know something bad is going to happen today."',
  catastrophizing:
    'Focusing on the worst-case scenario. "My boss asked if I had a few minutes to talk. I\'m going to get fired!"',
  labeling:
    'Defining a person based on one action or characteristic. "I said something embarrassing. I\'m such a loser."',
  "fortune telling":
    "Trying to predict the future. Focusing on one possibility and ignoring other, more likely outcomes.",
  blaming:
    'Giving away your own power to other people. "It\'s not my fault I yelled. You made me angry!"',
  magnification: "Exaggerating the importance of negative events.",
  "negative feeling or emotion":
    'Getting "stuck" on a distressing thought, emotion, or belief.',
  "mind reading":
    'Assuming you know what someone else is thinking. "She didn\'t say hello. She must be mad at me."',
  overgeneralizing:
    'Jumping to conclusions based on one experience. "They didn\'t text me back. Nobody ever texts me back."',
  "all-or-nothing thinking":
    "Thinking in extremes. \"If it isn't perfect, I failed. There's no such thing as 'good enough'.\"", 
    "I couldn't identify a recognizable thought from your input.":
    "Try a different thought"
};

export {
  platforms,
  usageOptions,
  stages,
  useStyles,
  thoughts,
  backendURL,
  frontendURL,
  distortions,
  distortionDescriptions,
};
