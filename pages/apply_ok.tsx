import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Apply() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FOCUS MEDIA KOREA</title>
        <meta name="description" content="focusmedia korea display" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>응모해주셔서 감사합니다.</div>
      </main>
    </div>
  );
}
