function conditionalSlice (str, isShort) {
  return isShort ? str.slice(0, 3) : str
}

function toMonthStr (monthNumber, isShort) {
  switch (monthNumber) {
    case 0: return conditionalSlice('January', isShort)
    case 1: return conditionalSlice('February', isShort)
    case 2: return conditionalSlice('March', isShort)
    case 3: return conditionalSlice('April', isShort)
    case 4: return conditionalSlice('May', isShort)
    case 5: return conditionalSlice('June', isShort)
    case 6: return conditionalSlice('July', isShort)
    case 7: return conditionalSlice('August', isShort)
    case 8: return conditionalSlice('September', isShort)
    case 9: return conditionalSlice('October', isShort)
    case 10: return conditionalSlice('November', isShort)
    case 11: return conditionalSlice('December', isShort)

    default: throw new Error('Incorrect month number (expected from 0 to 11)')
  }
}

export {
  toMonthStr
}
