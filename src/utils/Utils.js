export function parseQuestion(text) {
  const array = text.split('\r\n')
  const result = []
  let last
  for (const line of array) {
    switch (true) {
    case Boolean(line.match(/^###/)):
      if(last) result.push(last)
      last = {
        question: line.match(/^###.+\. (.*)/)[1],
        anwsers: [],
      }
      break
    case Boolean(line.match(/^\$\$/)):
      if(last) {
        const anwser = line.match(/^\$\$(.) (.*)$/)
        if(anwser[2]) last.anwsers.push({correct: anwser[1] === 'T', anwser: anwser[2]})
      }
      break
    default:
    }
  }
  return result
}
