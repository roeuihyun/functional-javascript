const log = console.log;

// 함수를 값으로 다루면서 받아둔 함수를 원하는 시점에 평가하는 함수
// 인자(argument)를 받아서 원하는 갯수만큼 인자가 들어왔을때
// 받아두었던 함수를 나중에 평가시키는 함수
// curry function 해석
// 함수를 받아서 일단 함수를 리턴함
// 그렇게 리턴된 함수가 실행 되었을때 인자가 두개 이상이라면
// 받아둔 함수를 즉시 실행하고
// 인자가 두개보다 작다면 함수를 다시 리턴한 후에
// 그 이후에 받은 인자를 합쳐서 수행한다.
const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});