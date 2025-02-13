function mysteryRange(s, n) {
  const splittedString = s.split('').map((string) => Number(string))

  const amount = Math.floor(splittedString.length / n)
  const rest = splittedString.length - n

  let temp = []
  for (let i = 1; i <= n; i++) {
    if (n - rest > 0) {
      if (i <= n - rest) {
        temp.push(amount)
      } else {
        temp.push(amount + 1)
      }
    } else {
      if (i <= rest - n) {
        temp.push(amount + 1)
      } else {
        temp.push(amount)
      }
      temp = temp.reverse()
    }
  }

  let stepIndex = temp.findIndex((number) => number !== temp[0])
  const step = 10 ** temp[stepIndex - 1]
  const startNumber = step - stepIndex
  const result = temp.map((n, index) => startNumber + index)

  return [result[0], result[result.length - 1]]
}

mysteryRange('6291211413114538107', 14)
mysteryRange('13161820142119101112917232215', 15)
mysteryRange('2318134142120517221910151678611129', 20)
mysteryRange('10610211511099104113100116105103101111114107108112109', 18)
mysteryRange(
  '1721532418565922162558663126649136347436733301144143236653738464135820194215516155541239452852623450572927602348104049',
  60
)
