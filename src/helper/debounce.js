export const debounce = (callBackFn, delay) => {
    let timer;
    return (ref) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        callBackFn.apply(ref);
      }, delay);
    };
}; 