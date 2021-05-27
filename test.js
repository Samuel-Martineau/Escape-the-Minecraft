function wait(delay) {
  return new Promise((r) => setTimeout(r, delay));
}

const log = (msg) => () => console.log(msg);

false && log("false");

true && log("true");
