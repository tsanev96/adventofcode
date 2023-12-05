export function convertTxtToArray(txt: string) {
  return txt
    .split("\n")
    .map((n) => n.trim())
    .filter((n) => n);
}
