require('array.prototype.flat/auto');
require('array.prototype.flatmap/auto');
const load = require('./_loadFile');

const input = () => load('./src/day2.txt').then(arr => arr.filter(s => s));

const countListIncludes = val => countList => countList.includes(val);

const partOne = strings => {
  const charCounts = strings.map(s =>
    s.split('').map((s, i, self) => self.filter(x => x === s).length)
  );
  return (
    charCounts.filter(countListIncludes(2)).length *
    charCounts.filter(countListIncludes(3)).length
  );
};

input().then(arr => console.log(partOne(arr)));

const offByOne = setLength => firstString => string =>
  string !== firstString &&
  string.reduce(
    (similarity, letter, index) =>
      letter === firstString[index] ? similarity + 1 : similarity,
    0
  ) ===
    setLength - 1;

const partTwo = strings => {
  const setLength = strings[0].length;
  return strings
    .map(s => s.split(''))
    .filter((s, i, self) => self.find(offByOne(setLength)(s)))
    .map((string, i, self) =>
      string.filter((letter) => self[i + 1] && self[i + 1].includes(letter))
    )
    .flat()
    .join('');
};

input().then(arr => console.log(partTwo(arr)));
