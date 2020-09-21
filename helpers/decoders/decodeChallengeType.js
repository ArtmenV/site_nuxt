/**
 * Decodes given number to stringified challenge type
 * 
 * @param {Number} typeNumber 
 * @returns {String} Stringified challenge type
 * @throws will throw an error if challenge type is
 * unknown
 * @throws will throw an error if param `typeNumber`
 * is not a number
 */
function decodeChallengeType (typeNumber) {
  if (isNaN(typeNumber)) {
    throw new Error('Challenge type should be a number')
  }

  switch (typeNumber) {
    case 1: return 'Open Challenge'
    case 2: return 'Member Challenge'

    default: throw new Error('Unknown challenge type')
  }
}

export {
  decodeChallengeType
}
