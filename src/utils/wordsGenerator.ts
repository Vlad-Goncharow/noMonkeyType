// Заранее подготовленный частотный список слов
const wordList = [
  "the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", 
  "apple", "banana", "grape", "orange", "kiwi", "pear", "peach",
  "car", "bicycle", "bus", "train", "plane", "boat", "subway", "even", "form", "person", "lorem", "impsum","play", "up", "can","last","things","give", "these", "against", "consider", "child", "plan","move","no","time","even","around","general","line"
];

// Функция для генерации текста
export function generateText(wordCount:number, unique:boolean) {
  if (unique && wordCount > wordList.length) {
    return "Запрошенное количество уникальных слов больше, чем доступно.";
  }

  const words = unique 
    ? Array.from(new Set(wordList)).slice(0, wordCount) 
    : Array.from({ length: wordCount }, () => wordList[Math.floor(Math.random() * wordList.length)]);
  
  return words.join(' ');
}
