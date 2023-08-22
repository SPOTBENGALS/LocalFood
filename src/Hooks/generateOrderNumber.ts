export function generateOrderNumber() {
  const date = new Date();
  let string = "";

  function random9Number() {
    let n = "";
    for (let i = 0; i < 9; i++) {
      n += Math.floor(Math.random() * 10);
    }

    return n;
  }

  function checkMonth(n: number) {
    let month = "";
    let number = 0;
    number += n;
    if (n + 1 < 10) {
      month = "0" + (number + 1).toString();
      return month;
    }
    return number + 1;
  }

  function checkNumber(n: number) {
    let time = "";
    let number = 0;
    number += n;
    if (n < 10) {
      time = "0" + number.toString();
      return time;
    }
    return number;
  }

  string =
    "1" +
    random9Number() +
    " - " +
    date.getFullYear() +
    checkMonth(date.getMonth()) +
    checkNumber(date.getDate()) +
    checkNumber(date.getHours()) +
    checkNumber(date.getMinutes());

  return string;
}
