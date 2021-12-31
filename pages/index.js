import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import animal from "../lib/animal.json";
import adjetivo from "../lib/adjetivo.json";
import verbo from "../lib/verbo.json";
import adverbios from "../lib/adverbios.json";
import { useEffect, useState } from "react";
import getScreenshot from "../services/carbonController";
import { Router } from "next/router";
import Link from "next/link";
import ActiveLink from "../components/ActiveLink";
import { phraseGenerator } from "./api/phrase";
import { ThemesList } from "../types/themes.enum";

export default function Home({ ditado, imagePath }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
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

        <ActiveLink href="/">
          {!loading && <h3>Gerar &rarr;</h3>}
          {loading && <h3>Gerando</h3>}
        </ActiveLink>

        {!loading && (
          <div style={{ alignItems: "center", borderWidth: 0.3 }}>
            <img src={imagePath} alt={imagePath} />
          </div>
        )}
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

export async function getStaticProps() {
  const { ditado } = await phraseGenerator();

  const getImagePath = await getScreenshot({
    code: ditado,
    language: "JavaScript",
    theme: ThemesList[Math.floor(Math.random() * ThemesList.length)],
    output: "./public/screenshots",
  });

  const imagePath = getImagePath.replace("public", "");
  return {
    props: {
      ditado,
      imagePath,
    }, // will be passed to the page component as props
  };
}
