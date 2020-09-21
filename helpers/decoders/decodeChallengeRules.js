function decodeChallengeRules (typeNumber) {
  if (isNaN(typeNumber)) {
    throw new Error('Challenge ruleset should be a number')
  }

  switch (typeNumber) {
    case 1: return 'Minimal rules'
    case 2: return 'Standard rules'
    case 3: return 'Extended rules'
    case 4: return 'Special rules'

    default: throw new Error('Unknown challenge ruleset')
  }
}

export {
  decodeChallengeRules
}
