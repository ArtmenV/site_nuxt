import { toMonthStr } from './index'

function ISOTimeForChallenge (dateISOString) {
  // const isMonthShort = options && !!options.shortMonth

  const date = new Date(dateISOString)

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  return `${toMonthStr(month)} ${day}, ${year}`
}

export {
  ISOTimeForChallenge
}
