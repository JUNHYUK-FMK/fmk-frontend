import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Apply() {
  const router = useRouter();
  const { eleId, adId } = router.query;
  const [scanTime, setScanTime] = useState('');
  const [enableInput, setEnableInput] = useState(true);

  useEffect(() => {
    setScanTime(new Date().toLocaleString());
    setTimeout(function () {
      alert('QR코드가 만료되었습니다. 다시 스캔해주세요.');
      setEnableInput(false);
    }, 300000);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>FOCUS MEDIA KOREA</title>
        <meta name="description" content="focusmedia korea display" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form action="/apply_ok" method="post">
          <div className={styles.inputBox}>
            광고ID: <input value={adId} readOnly></input>
          </div>
          <div className={styles.inputBox}>
            앨레베이터ID: <input value={eleId} readOnly></input>
          </div>
          <div className={styles.inputBox}>
            코드스캔 스캔시간: <input value={scanTime} readOnly></input>
          </div>
          <hr />
          <div className={styles.inputBox}>
            이름: <input id="name" name="name"></input>
          </div>
          <div className={styles.inputBox}>
            메일 주소: <input id="email" name="email" required></input>
          </div>
          <div className={styles.agree}>
            약관 동의: <input id="YES" value="YES" name="agree" type="radio" />예
            <input id="NO" value="NO" name="agree" type="radio" />
            아니오
          </div>
          <div className={styles.inputBox}>
            <button type="submit" disabled={!enableInput}>
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
