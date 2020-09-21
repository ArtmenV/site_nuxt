import { isObjectEmpty } from './isObjectEmpty'

const isObject = v => v && typeof v === 'object'

const removeEmpty = (obj) => {
  Object.keys(obj).forEach(key => {
    if (isObject(obj[key]) && isObjectEmpty(obj[key])) {
      delete obj[key]
    } else if (obj[key] && typeof obj[key] === 'object') {
      removeEmpty(obj[key])
    } else if (obj[key] === undefined) {
      delete obj[key]
    }
  })

  return obj
}

/**
 * Finds differences between an object and it's old copy.
 * Returns an object contained changed props.
 * 
 * @param {object} _new new object
 * @param {object} _old old object
 */
function getObjectDifference(_new, _old) {
  return removeEmpty(Object.assign(...Array.from(
    new Set([...Object.keys(_new), ...Object.keys(_old)]),
    k => ({ [k]: isObject(_new[k]) && isObject(_old[k])
      ? getObjectDifference(_new[k], _old[k])
      : _new[k] === _old[k] ? undefined : _new[k]
    })
  )))
}

export {
  getObjectDifference
}
