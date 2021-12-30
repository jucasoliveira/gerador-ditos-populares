import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import animal from "../lib/animal.json";
import adjetivo from "../lib/adjetivo.json";
import verbo from "../lib/verbo.json";
import adverbios from "../lib/adverbios.json";
import { useState } from "react";

export default function Home() {
  const [animalName, setAnimalName] = useState("");
  const [adjetivoName, setAdjetivoName] = useState("");
  const [naoState, setNaoState] = useState(false);
  const [verboName, setVerboName] = useState("");
  const [adverbiosName, setAdverbiosName] = useState("");

  const handleChange = () => {
    const randomAnimal = animal[Math.floor(Math.random() * animal.length)];
    const randomAdjetivo =
      adjetivo[Math.floor(Math.random() * adjetivo.length)];
    const randomVerbo = verbo[Math.floor(Math.random() * verbo.length)];
    const randomAdverbios =
      adverbios[Math.floor(Math.random() * adverbios.length)];
    setAdverbiosName(randomAdverbios);
    setVerboName(randomVerbo);
    setAdjetivoName(randomAdjetivo);
    setAnimalName(randomAnimal);
    setNaoState(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Gerador de ditos populares</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Gerador de ditos <a>Populares!</a>
        </h1>

        <button onClick={handleChange} className={styles.card}>
          <h2>Gerar &rarr;</h2>
        </button>

        <div className={[styles.card, { width: "200px" }]}>
          <h2>
            {animalName} {adjetivoName} {naoState ? "não" : ""} {verboName}
            {adverbiosName}
          </h2>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
