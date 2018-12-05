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

input().then(console.log);
