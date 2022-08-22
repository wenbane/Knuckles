export const setIntervalX = (
  callback: () => any,
  delay: number,
  repetitions: number
): void => {
  let x = 0;
  const intervalID = window.setInterval(() => {
    callback();
    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
};
