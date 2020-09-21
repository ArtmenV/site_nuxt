import { toMonthStr } from './index'

function ISOToReadableString (dateISOString, options) {
  const isMonthShort = options && !!options.shortMonth

  const date = new Date(dateISOString)

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  if (options && options.year) {
    return `${day} ${toMonthStr(month, isMonthShort)}, ${year}`
  } else {
    return `${day} ${toMonthStr(month, isMonthShort)}`
  }
}

export {
  ISOToReadableString
}
