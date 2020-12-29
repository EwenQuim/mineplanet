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

export const displayDate = (dateString: Date): string => {
  const date = new Date(dateString);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

export const nameToColor = (name: string) => {
  // return '#FFF';

  return intToRGB(hashCode(name));
};

function hashCode(name: string): number {
  // java String#hashCode
  const str = name.toLowerCase();
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i: number): string {
  // base: le nombre détermino-aléatoire est entre 0 et 360
  let base = Math.abs(i);

  let colors = [
    'pink',
    '#9b88ee',
    'gainsboro',
    'yellow',
    'skyblue',
    'salmon',
    'sandybrown',
    'palegreen',
    'paleturquoise',
    'bisque'
  ];

  return colors[trueMod(base, colors.length)];
}

function trueMod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
