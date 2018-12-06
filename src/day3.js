require('array.prototype.flat/auto');
const load = require('./_loadFile');

const makeNumber = n => parseInt(n);

const input = () =>
  load('./src/day3.txt').then(arr =>
    arr
      .filter(s => s)
      .map(claim => {
        const [id, spot] = claim.split(' @ ');
        const [offset, size] = spot.split(': ');
        const [x, y] = offset.split(',').map(makeNumber);
        const [w, h] = size.split('x').map(makeNumber);
        return {
          id,
          offset: { x, y },
          size: { w, h }
        };
      })
  );

const filledArray = width => filling => Array(width).fill(filling);

const createCloth = width => filledArray(width)(filledArray(width)(0));

const partOne = claims => {
  const cloth = createCloth(1000);
  claims.forEach(claim => {
    const { offset } = claim;
    const { size } = claim;
    const toFill = {
      x: offset.x + size.w,
      y: offset.y + size.h
    };
    for (let index = offset.y; index < toFill.y; index++) {
      cloth[index] = cloth[index].map((inch, index) => {
        if (index > offset.x && index <= toFill.x) {
          return inch + 1;
        }
        return inch;
      });
    }
  });
  return cloth.flat().filter(inch => inch > 1).length;
};

input().then(arr => console.log(partOne(arr)));
