export const getETA = (deadline) => {
  if (!deadline) return { text: "", color: "transparent" };

  const now = new Date();
  const target = new Date(deadline);
  const diffInMs = target - now;

  if (diffInMs <= 0) {
    return { text: "Po terminie", color: "#EF4444" };
  }

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  const color = diffInMs < 3600000 ? "#FACC15" : "#3B82F6";

  let text = "";
  if (weeks > 0) text = `${weeks}w`;
  else if (days > 0) text = `${days}d`;
  else if (hours > 0) text = `${hours}h`;
  else if (minutes > 0) text = `${minutes}m`;
  else text = `${seconds}s`;

  return { text, color };
};
