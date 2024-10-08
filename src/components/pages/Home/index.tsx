'use client';
import { FC, useEffect, useState } from 'react';
import AOS from 'aos';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTelegram } from '@providers/telegram-provider';
import { useThreeScene } from '@hooks/useThreeScene';

import Main from '@components/pages/Home/components/Main';
import About from '@components/pages/Home/components/About';
import Skills from '@components/pages/Home/components/Skills';

import { Spinner } from '@components/ui';
import { usePathname } from 'next/navigation';
import { yandexCounter } from '@lib/yandexCounter';

import styles from "@components/pages/Home/index.module.scss";

const HomePage: FC = () => {
  const { webApp, chatId} = useTelegram();
  const pathname = usePathname();

  const [finishedText, setFinishedText] = useState(false);
  const text = 'I&rsquo;\tam a frontend developer with 5 years of experience. I love coding and building websites.';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const tgUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || '';

  const { isReady } = useThreeScene();

  useEffect(() => {
    yandexCounter.hit(pathname);
  }, [pathname]);

  useEffect(() => {
    if (webApp) {
      webApp?.ready();
      webApp?.expand();
    }
  }, [webApp]);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  if (!isReady) {
    return (
      <Spinner />
    );
  }

  if (!chatId) {
    return (
      <div className={styles.error} data-aos="zoom-in">
        <h2>Something went wrong</h2>
        <p>Open the app in <a
          onClick={() => yandexCounter.initReach('click-tg-404')}
          href='https://t.me/Zedbyl_bot'
          target="_blank"
        >Telegram</a> or try again later 😏</p>
      </div>
    );
  }

  return (
    <TonConnectUIProvider
      manifestUrl={`${baseUrl}tonconnect-manifest.json`}
      actionsConfiguration={{
        // @ts-ignore
        twaReturnUrl: tgUrl
      }}
    >
      <div className={styles.wrap}>
        {/*<div className={styles.lang}>En</div>*/}

        <Main />
        <About text={text} setFinishedText={setFinishedText} />

        {finishedText && (
          <Skills />
        )}
      </div>
    </TonConnectUIProvider>
  );
};

export default HomePage;
