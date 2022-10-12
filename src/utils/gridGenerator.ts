const generateGrid = (size: number) => {
  const generated = Array(size * size)
    .fill("X")
    .map((item: string, i: number) => {
      const random = Math.floor(Math.random() * 10);
      if (random % 2 === 1 || i % 2 === 0) return "-";
      else return item;
    });
  return generated;
};

export default generateGrid;
