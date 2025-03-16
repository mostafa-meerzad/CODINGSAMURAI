export const formatMessageTime = (date) => {
  return new Date(date).toLocaleString("en-us", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
};
