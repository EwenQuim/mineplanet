/**
 * Take an amount of seconds and return its MM:SS representation
 * @param seconds The amount of seconds
 */
export const displayTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  return `${minutes < 10 ? '0' : ''}${minutes}:${
    remainder < 10 ? '0' : ''
  }${remainder}`;
};

export const displayIndex = (index: number): string => {
  switch (index) {
    case 0:
      return '🥇 1';
    case 1:
      return '🥈 2';
    case 2:
      return '🥉 3';
    default:
      return (index + 1).toString();
  }
};
