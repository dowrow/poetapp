const TOKENS = /[,.;:-_–¡!¿?"'»()+{}<>(\r\n|\n|\r)]/gm;

function cleanWord(word) {
  return word.toLowerCase().replace(TOKENS, '');
}

export default class MarkovChain {
  constructor(texts, order = 1) {
    this.wordMap = {};
    this.order = order;

    texts.forEach((text) => {
      const words = text.split(/\s+/).map((word) => cleanWord(word));
      
      for (let i = 0; i < (words.length - this.order); i++) {
        const key = words.slice(i, i + this.order).join(' ');
        if (!this.wordMap[key]) {
          this.wordMap[key] = [];
        }
        this.wordMap[key].push(words[i + this.order]);
      }
    });

    this.wordMap = Object.keys(this.wordMap).sort().reduce(
      (obj, key) => { 
        obj[key] = this.wordMap[key]; 
        return obj;
      }, 
      {}
    );
    
    console.log(this.wordMap);
  }

  generateText(numberOfWords) {
    const keys = Object.keys(this.wordMap);
    const textWords = keys[Math.floor(Math.random() * keys.length)].split(' ');

    for (let i = 0; i < numberOfWords; i ++) {
      const lastWords = textWords.slice(-1 * this.order).join(' ');

      if (this.wordMap[lastWords]) {
        let nextWord = this.wordMap[lastWords][Math.floor(Math.random() * this.wordMap[lastWords].length)];
        textWords.push(nextWord);  
      }
    }

    return textWords.join(' ');
  }
}