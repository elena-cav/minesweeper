const generateGrid = (size: number) => {
  const random = Math.floor(Math.random() * 10);
  const generated = Array(size * size)
    .fill("X")
    .map((item: string, i: number) =>
      random % 2 === 1 || i % 2 === 0 ? "-" : item
    );
  return generated;
};

export default generateGrid;
