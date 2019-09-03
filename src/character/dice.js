import { Random } from "random-js";
const random = new Random(); // uses the nativeMath engine

export default function roll() {
  return new Promise((resolve, reject) => {
    try {
      let rolls = [];
      for (let i = 0; i < 3; i++) {
        const r = random.integer(1, 20);
        rolls.push(r);
      }
      resolve(rolls);
    } catch (e) {
      reject(e);
    }
  });
}
