function announce (msg) { // instead of export function notify(msg)
  alert(msg);
}

function log (msg) {
  console.log(msg);
}

export default {
  announce: announce,
  log: log
}
