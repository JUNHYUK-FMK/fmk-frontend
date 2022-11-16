import Head from 'next/head';
import Image from 'next/image';
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
      }, 10000);
    });
  }, []);

  const changeAd = () => {
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
            <div>
              광고ID: <input value={adId}></input>
            </div>
            <div>
              광고종류: <input value={adType}></input>
            </div>
            <div>
              광고 표시일: <input value={adDate}></input>
            </div>
            <div>
              광고 표시 시작 시간:<input value={adStartTime}></input>
            </div>
            <div>
              광고 표시 종료 시간:<input value={adEndTime}></input>
            </div>
            <div>
              앨리베이터별 하루 송출 제한 횟수<input value={adlimit}></input>
            </div>
            엘리베이터 ID <input value={eleId}></input>
          </div>
        </div>
      </main>
    </div>
  );
}
