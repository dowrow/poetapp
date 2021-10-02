const TOKENS = /[,.;:-_–¡!¿?"'»()+{}<>(\r\n|\n|\r)]/gm;

function cleanWord(word) {
  return word.toLowerCase().replace(TOKENS, '');
}

export default class MarkovChain {
  constructor(texts, order) {
    this.wordMap = {};
    this.order = order;

    texts.forEach((text) => {
      const words = text.split(/\s+/).map((word) => cleanWord(word));

      words.forEach((word, i) => {
        if (!this.wordMap[word]) {
          this.wordMap[word] = [];
        }
        if (words[i + 1]) {
          this.wordMap[word].push(cleanWord(words[i + 1]));
        }
      });
    });

    console.table(this.wordMap);
  }

  generateText(numberOfWords) {
    const words = Object.keys(this.wordMap);
    let word = words[Math.floor(Math.random() * words.length)];
    let result = '';

    for (let i = 0; i < numberOfWords; i++) {
      result += word + ' ';
      word = this.wordMap[word][Math.floor(Math.random() * this.wordMap[word].length)];
      if (!word || !this.wordMap.hasOwnProperty(word)) {
        word = words[Math.floor(Math.random() * words.length)];
      }
    }

    return result;
  }
}