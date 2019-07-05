export function parseQuestion(text) {
  try {
    const json = JSON.parse(text)
    json.forEach(j => {
      j.answered = false
      j.answers.forEach(a => {
        a.checked = false
      })
      j.answers = shuffle(j.answers)
    })
    return json
  } catch (error) {
    return parseFromTXT(text)
  }
}

export function parseFromTXT(text) {
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
        answered: false,
      }
      break
    }
    case Boolean(line.match(/^\$\$/)): {
      if(last) {
        const answer = line.match(/^\$\$(.) (.*)$/)
        if(answer[2]) last.answers.push({
          correct: answer[1] === 'T',
          value: answer[2],
          checked: false,
        })
      }
      break
    }
    default:
    }
  }
  if(last) result.push(last)
  result.forEach(q => q.answers = shuffle(q.answers))
  return result
}

export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
