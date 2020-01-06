function display (seconds) {
  const format = val => `0${Math.floor(val)}`.slice(-2)
  const hours = seconds / 3600
  const minutes = (seconds % 3600) / 60

  return [minutes, seconds % 60].map(format).join(':')
}

export default display;


// function pad(n, width, z = 0) {
//   n = n + '';
//   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
// }

// const minutesAndSeconds = (position) => ([
//   pad(Math.floor(position / 60), 2),
//   pad(position % 60, 2),
// ]);