require('array.prototype.flatmap/auto');
const load = require('./_loadFile');

const input = () => load('./src/day2.txt').then(arr => arr.filter(s => s));

const countListIncludes = val => countList =>
  countList.flatMap(count => Object.values(count)).includes(val);

const partOne = strings => {
  const charCounts = strings.map(s =>
    s.split('').map((s, i, self) => ({
      [s]: self.filter(x => x === s).length
    }))
  );
  return (
    charCounts.filter(countListIncludes(2)).length *
    charCounts.filter(countListIncludes(3)).length
  );
};

input().then(arr => console.log(partOne(arr)));
