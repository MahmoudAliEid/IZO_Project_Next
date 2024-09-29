// ** Returns initials from string
export const getInitials = (string: string) => {
  // string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
  const arrOfWords = string.split(/\s/)
  let initials = ''
  for (let i = 0; i < 2; i++) {
    if (arrOfWords[i] && arrOfWords[i].length > 0) {
      initials += arrOfWords[i].charAt(0)
    }
  }

  return initials
}
