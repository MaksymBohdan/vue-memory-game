export function shuffleArray<Card>(array: number[]) {
  const shuffledArray = array.concat(array).map((card, idx) => ({
    value: card,
    id: idx,
    matched: false,
  }));

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArray[i];

    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }
  return shuffledArray;
}

export function mlsToMinutesAndSeconds<GameTime>(mls: number) {
  const minutes = Number(Math.floor(mls / 60000));
  const seconds = Number(((mls % 60000) / 1000).toFixed(0));

  return { seconds, minutes };
}
