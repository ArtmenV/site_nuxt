/**
 * All dates use UTC by default.
 */

import { DateTime } from "luxon"

const sec = 1000
const min = 60 * sec
const hour = 60 * min
const day = 24 * hour
const week = 7 * day

export function timeAgo (dateISO) {
  const date = DateTime.fromISO(dateISO).setZone()
  const dateNow = DateTime.utc().setZone()

  // time past in milliseconds
  const diff = dateNow.diff(date)
  const diffDays = Math.floor(diff / day)
  const diffHours = Math.floor((diff - diffDays * day) / hour)

  const time = date.setLocale('en').toFormat('HH:mm')

  if (diffDays > 1) {
    return `${diffDays} days ago, ${time}`
  } else {
    return `Today, ${time}`
  }
}

export function timeLeft (dateISO) {
  const date = DateTime.fromISO(dateISO).setZone()
  const dateNow = DateTime.utc().setZone()

  // time past in milliseconds
  const diff = date.diff(dateNow)
  const diffDays = Math.floor(diff / day)
  const diffHours = Math.floor((diff - diffDays * day) / hour)

  if (diffDays && diffHours) {
    return `${diffDays} days and ${diffHours} hours left`
  } else if (diffDays) {
    return `${diffDays} days left`
  } else if (diffHours) {
    return `${diffDays} hours left`
  } else {
    return `Less then an hour left`
  }
}

export default timeAgo
