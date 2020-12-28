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
  let base = Math.abs(i) % 360;

  // frequency
  let code = base + 0.5 * (360 - 60 * Math.log(base));

  // goes towards the 6 main spots
  let correction = -trueRemainder(code, 60);
  correction *= 0.5;

  let hue = (code + correction) % 360;

  let lightCorrect = 60 - Math.abs(trueRemainder(code, 60));
  lightCorrect *= 0.1;

  let light = 80 - lightCorrect;

  return `hsl(${hue}, 100%, ${light}%)`;
  // return (
  //   '#' +
  //   ((parseInt(code.substr(0, 1), 16) + 1) % 16).toString(16) +
  //   code.substr(1)
  // );
}

const trueRemainder = (n: number, m: number): number => {
  let mod = trueMod(n, m);
  mod -= mod > m / 2 ? m : 0;
  return mod;
};

function trueMod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
