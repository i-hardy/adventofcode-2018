const load = require('./_loadFile');

const sanitizeInput = () =>
  load('./src/day1.txt').then(arr =>
    arr.map(n => parseInt(n)).filter(n => !isNaN(n))
  );

const sum = (x, y) => x + y;

const partOne = arr => arr.reduce(sum, 0);

sanitizeInput().then(arr => console.log(partOne(arr)));

const partTwo = (arr, startFreqs = new Set([0]), lastLast = 0) => {
  const dupes = [];
  const freqs = arr.reduce(
    ({ sums, last }, n) => {
      const next = sum(last, n);
      if (sums.has(next)) {
        dupes.push(next);
      }
      return {
        sums: sums.add(next),
        last: next
      };
    },
    { sums: startFreqs, last: lastLast }
  );
  if (dupes.length) {
    return dupes[0];
  }
  const freqsArray = [...freqs.sums];
  const lastFreq = freqsArray[freqsArray.length - 1];
  return partTwo(arr, freqs.sums, lastFreq);
};

sanitizeInput().then(arr => console.log(partTwo(arr)));
