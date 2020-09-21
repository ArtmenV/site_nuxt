function toPlaceStr (place) {
  const lastDigit = place.toString().slice(-1)

  switch (+lastDigit) {
    case 1: return `${place}st`
    case 2: return `${place}nd`
    case 3: return `${place}rd`

    default: return `${place}th`
  }
}

export {
  toPlaceStr
}
