import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { Advertisement } from '../types/advertisement';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';

export default function Home() {
  let num: number = 0;
  let adData: Advertisement[];

  const [url, setUrl] = useState('');
  const [adId, setAdId] = useState('');
  const [adType, setAdType] = useState('');
  const [adDate, setAdDate] = useState('');
  const [adStartTime, setAdStartTime] = useState('');
  const [adEndTime, setAdEndtime] = useState('');
  const [adlimit, setAdLimit] = useState('');
  const [eleId, setEleId] = useState('ELE_3041');

  useEffect(() => {
    axios.get('/api/ad').then((response) => {
      adData = response.data;
      changeAd();
      let timer = setInterval(() => {
        changeAd();
      }, 30000);
    });
  }, []);

  const changeAd = () => {
    if (adData[num].limit == -1) return;

    setAdStartTime(adData[num].startTime.toString());
    setAdEndtime(adData[num].endTime.toString());

    let nextAd: boolean = false;
    const timestamp = new Date().getTime();
    const date = new Date(timestamp);
    const nowTime = date.getHours() * 60 + date.getMinutes();

    const adStartTimeMin =
      parseInt(adData[num].startTime.substr(0, 2)) * 60 +
      parseInt(adData[num].startTime.substr(-2));
    const AdEndtimeMin =
      parseInt(adData[num].endTime.substr(0, 2)) * 60 + parseInt(adData[num].endTime.substr(-2));

    if (nowTime >= adStartTimeMin && AdEndtimeMin >= nowTime && adData[num].limit >= 0) {
      setAdId(adData[num].id.toString());
      setAdType(adData[num].type.toString());
      setAdDate(adData[num].date.toString());

      setUrl(num.toString());
      adData[num].limit -= 1;
      setAdLimit(adData[num].limit.toString());

      setUrl(`http://localhost:3000/apply?eleId=${eleId}&adId=${adData[num].id}`);
    } else {
      nextAd = true;
    }

    num += 1;
    if (adData.length === num) num = 0;
    if (nextAd == true) changeAd();
  };

  const qrcode = <QRCodeCanvas id="qrCode" value={url} size={300} bgColor={'white'} level={'H'} />;

  return (
    <div className={styles.container}>
      <Head>
        <title>FOCUS MEDIA KOREA</title>
        <meta name="description" content="focusmedia korea display" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>{qrcode}</div>
        <div>
          <div>
            <div className={styles.inputBox}>
              ??????ID: <input value={adId} readOnly></input>
            </div>
            <div className={styles.inputBox}>
              ????????????: <input value={adType} readOnly></input>
            </div>
            <div className={styles.inputBox}>
              ?????? ?????????: <input value={adDate} readOnly></input>
            </div>
            <div className={styles.inputBox}>
              ?????? ?????? ?????? ??????:<input value={adStartTime} readOnly></input>
            </div>
            <div className={styles.inputBox}>
              ?????? ?????? ?????? ??????:<input value={adEndTime} readOnly></input>
            </div>
            <div className={styles.inputBox}>
              ?????? ?????? ?????? ??????:<input value={adlimit} readOnly></input>
            </div>
            <div className={styles.inputBox}>
              ??????????????? ID: <input value={eleId} readOnly></input>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
