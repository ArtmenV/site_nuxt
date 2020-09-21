
function formatAMPM(data) {
  let date = new Date(data)
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let secondes = date.getSeconds();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  secondes = secondes < 10 ? '0' + secondes : secondes;
  let strTime = hours + ':' + minutes + ':' + secondes + ' ' + ampm.toUpperCase();
  return strTime;
}

export {
  formatAMPM
}