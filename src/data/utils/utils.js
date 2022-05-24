exports.formatData = (input) => {
  if (!input) return [];
  const splitData = input.split("\n");

  const formattedData = splitData.map((datum) => {
    const numberRegEx = /-*\d+/g;
    const numberData = datum.match(numberRegEx);

    const [posX, posY, velX, velY] = numberData.map((x) => Number(x));

    const light = { position: [posX, posY], velocity: [velX, velY] };

    return light;
  });

  return formattedData;
};
