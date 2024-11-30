const wordList = [
  'the',
  'quick',
  'brown',
  'fox',
  'jumps',
  'over',
  'lazy',
  'dog',
  'apple',
  'banana',
  'grape',
  'orange',
  'kiwi',
  'pear',
  'peach',
  'car',
  'bicycle',
  'bus',
  'train',
  'plane',
  'boat',
  'subway',
  'even',
  'form',
  'person',
  'lorem',
  'impsum',
  'play',
  'up',
  'can',
  'last',
  'things',
  'give',
  'these',
  'against',
  'consider',
  'child',
  'plan',
  'move',
  'no',
  'time',
  'even',
  'around',
  'general',
  'line',
]

export const punctuationList = [
  '.',
  ',',
  ';',
  '!',
  '?',
  ':',
  '-',
  '/',
  '<',
  '>',
  '(',
  ')',
]

const numberList = Array.from({ length: 100 }, (_, i) => i.toString())

export function generateText(
  wordCount: number,
  unique: boolean,
  numbers: boolean = false, // Включить числа
  punctuation: boolean = false // Включить пунктуацию
): string {
  let combinedList = [...wordList]

  // Добавляем числа, если `number` включен
  if (numbers) {
    const weightedNumbers = numberList.flatMap(
      (num) => Array.from({ length: 1 }, () => num) // Меньший вес для чисел
    )
    const weightedWords = wordList.flatMap(
      (word) => Array.from({ length: 8 }, () => word) // Больший вес для слов
    )
    combinedList = [...weightedWords, ...weightedNumbers]
  }

  // Добавляем пунктуацию, если `punctuation` включен
  if (punctuation) {
    combinedList = [...combinedList, ...punctuationList]
  }

  // Проверяем уникальность
  if (unique && wordCount > new Set(combinedList).size) {
    return 'Запрошенное количество уникальных слов больше, чем доступно.'
  }

  // Генерация текста
  const words = unique
    ? Array.from(new Set(combinedList)).slice(0, wordCount)
    : Array.from(
        { length: wordCount },
        () => combinedList[Math.floor(Math.random() * combinedList.length)]
      )

  return words.join(' ')
}
