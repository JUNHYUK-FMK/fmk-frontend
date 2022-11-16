import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Advertisement } from '../types/advertisement';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';

export default function Apply() {
  const router = useRouter();
  const { eleId } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>FOCUS MEDIA KOREA</title>
        <meta name="description" content="focusmedia korea display" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{eleId}</main>
    </div>
  );
}
