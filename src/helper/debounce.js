/**
 * This triggers the function after given amout of time
 * @param {function} fn, function that needs to be called after given time has 
 * passed 
 * @param {*} delay, time in ms which needs to be set for the timer
 */
export const debounce = (fn, delay) => {
    let timer;
    return (ref) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(ref);
      }, delay);
    };
}; 