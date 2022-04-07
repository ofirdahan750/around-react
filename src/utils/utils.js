function getRandomString(length = getRandomInt()) {
  let chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz".split("");

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  str += Date.now();
  return str + Date.now();
}
function getRandomInt(min = 50, max = 150) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomString };
