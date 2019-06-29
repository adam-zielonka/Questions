export function parseQuestion(text) {
  const array = text.split('\r\n')
  const result = []
  let last
  for (const line of array) {
    switch (true) {
    case Boolean(line.match(/^###/)): {
      if(last) result.push(last)
      const question = line.match(/^###([0-9]+)\. (.*)/)
      last = {
        code: question[1],
        question: question[2],
        answers: [],
      }
      break
    }
    case Boolean(line.match(/^\$\$/)): {
      if(last) {
        const anwser = line.match(/^\$\$(.) (.*)$/)
        if(anwser[2]) last.answers.push({
          correct: anwser[1] === 'T',
          value: anwser[2],
          checked: false,
        })
      }
      break
    }
    default:
    }
  }
  return result
}
