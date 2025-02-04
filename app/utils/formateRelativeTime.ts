export const formateRelativeTime = (date: Date) => {
  const now = new Date();
  const daysPassed = Math.floor(
    (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysPassed === 0) {
    return "Posted Today";
  } else if (daysPassed === 1) {
    return "Posted 1 Day ago";
  } else {
    return `Posted ${daysPassed} days ago`;
  }
};
