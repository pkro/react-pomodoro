export function seconds2display(numSeconds) {
  const minutes = Math.round(numSeconds / 60);
  const seconds = (numSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}