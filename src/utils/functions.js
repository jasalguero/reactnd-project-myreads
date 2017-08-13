/**
 * Debounces the calling of the function until the delay time has passed without new calls
 * @param {*} fn 
 * @param {*} delay 
 */
export const debounce = (fn, delay) => {
  var timer = null;

  return function() {
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};