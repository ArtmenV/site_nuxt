const prettier = {
  /**
   * Decodes given number to gender string.
   * 
   * @param {number} genderNumber number of gender
   */
  gender (genderNumber) {
    switch (genderNumber) {
      case 0:
      case null:
        return 'Not specified'

      case 1: return 'Male'

      case 2: return 'Female'

      default: return 'Non binary'
    }
  }
}

export {
  prettier
}
