import Head from 'next/head'
import { useState, useEffect } from 'react';

import styles from '../styles/Home.module.css'

import MarkovChain from '../classes/MarkovChain';
import poemasJuanRamon from '../data/JuanRamon';
import poemasLorca from '../data/Lorca';
import poemasBecquer from '../data/Becquer';
import cancionesMontefusco from '../data/EnricMontefusco';
import stopWords from '../data/StopWords';

const writtingStyles = [
  {
    name: 'Federico García Lorca',
    texts: poemasLorca,
  },
  {
    name: 'Gustavo Adolfo Bécquer',
    texts: poemasBecquer,
  },
  {
    name: 'Juan Ramón Jimenez',
    texts: poemasJuanRamon,
  },
  {
    name: 'Enric Montefusco',
    texts: cancionesMontefusco,
  },
  {
    name: 'Mixto',
    texts: [].concat.apply([], [
      poemasLorca, 
      poemasBecquer, 
      poemasJuanRamon,
      cancionesMontefusco,
    ]),
  }
];

export default function Home() {
  const [poem, setPoem] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(0);

  function endsWithStopWord(poem) {
    const stopWordList = stopWords.split(/\s+/);
    let words = poem.split(/\s+/);
    return stopWordList.includes(words[words.length - 1]);
  }

  function generatePoem() {
    const markovChain = new MarkovChain(writtingStyles[selectedStyle].texts);
    let poem = markovChain.generateText(16);

    while(endsWithStopWord(poem)) {
      const words = poem.split(/\s+/);
      words.pop();
      poem = words.join(' ');
    }

    setPoem(poem);
  }

  useEffect(() => {
    generatePoem();
  }, [selectedStyle]);

  return (
    <div className={styles.container}>
      <Head>
        <title>PoetApp</title>
        <meta name="description" content="Genera estrofas poéticas usando cadenas de Markov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>PoetApp</h1>
      <p className={styles.description}>
        Genera estrofas poéticas usando cadenas de Markov
      </p>
      <label className={styles.styleLabel} htmlFor="style">Estilo de escritura:</label>
      <select id="style" className={styles.style} value={selectedStyle} onChange={(event) => setSelectedStyle(event.target.value)}>
        {writtingStyles.map((option, i) => <option key={option.name} value={i}>
          {option.name}
        </option>)}
      </select>
      <article className={styles.poem}>
        {poem}
      </article>
      <button className={styles.button} onClick={generatePoem}>
        ✨ Generar texto ✨
      </button>
    </div>
  )
}
