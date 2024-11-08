function stringToColor(string) {
  if (!string) return "#ccc"; // Default color if no string is provided
  let hash = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name) {
  const initials = name
    ? name
        .split(" ")
        .map(word => word[0])
        .slice(0, 2)
        .join("")
    : "U"; // Default to "U" if name is not available

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}
