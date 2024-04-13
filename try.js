const numbers = [
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
];

const newMap = numbers.map((e) => {
  for (let i = 0; i < e.length; i++) {
    let a = e[i];
    for (let j = 0; j < e[0].length; j++) {
      return a;
    }
  }
});

console.log(newMap);
