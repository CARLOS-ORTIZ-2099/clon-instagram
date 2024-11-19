export function debounce(cb, delay) {
  let time;
  return (identificador, action) => {
    clearTimeout(time);
    time = setTimeout(() => {
      cb(identificador, action);
    }, delay);
  };
}
