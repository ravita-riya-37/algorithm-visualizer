export const generateArray = (size = 20) =>
  Array.from({ length: size }, () =>
    Math.floor(Math.random() * 300) + 20
  );
