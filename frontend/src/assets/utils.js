const capitalizeWords = (string) => {
  return string
    .replace(
      /\b(?:and|or|but|a|an|the|of|in|on|at|for|to|with|by|as|from|about|into|through|over|after|before|during|under)\b/gi,
      (word) => {
        return word.toLowerCase();
      }
    )
    .replace(/^\w|\b\w/g, (firstLetter) => firstLetter.toUpperCase());
};

export { capitalizeWords };