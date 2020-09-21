import { toMonthStr } from './index'

function ISOToDateOfBirth (dateISOString) {
  const date = new Date(dateISOString)

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  return `${day} ${toMonthStr(month)}, ${year}`
}

export {
  ISOToDateOfBirth
}
