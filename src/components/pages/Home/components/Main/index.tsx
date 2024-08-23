import { useState } from 'react';
import Image from 'next/image';
import { useTelegram } from '@providers/telegram-provider';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { beginCell, toNano } from 'ton';

import styles from '@components/pages/Home/index.module.scss';
import ava from '@app/face.jpg';

const body = beginCell()
.storeUint(0, 32)
.storeStringTail("Thanks, TON!")
.endCell();

const Main = () => {
  const { user, webApp, chatId } = useTelegram()
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonWallet();
  const [isLoading, setIsLoading] = useState(false)

  const address = process.env.NEXT_PUBLIC_TON_ADDRESS!!

  const myTransaction = {
    validUntil: Math.floor(Date.now() / 1000) + 360,
    messages: [
      {
        address,
        amount: toNano(1).toString(),
        payload: body.toBoc().toString("base64")
      }
    ]
  }

  const changeLoading = () => {
    setIsLoading((prevState) => !prevState)
  }

  const handleDonate = async () => {
    if (!address) {
      webApp?.HapticFeedback?.notificationOccurred('error')
      return null
    }

    try {
      changeLoading()
      webApp?.HapticFeedback?.impactOccurred('soft')
      await tonConnectUI.sendTransaction(myTransaction)
      webApp?.HapticFeedback?.notificationOccurred('success')
      changeLoading()
    } catch (error) {
      console.error(error)
      webApp?.HapticFeedback?.notificationOccurred('error')
      changeLoading()
    }
  }

  const handleResume = async () => {
    try {
      changeLoading()
      webApp?.HapticFeedback.impactOccurred('light')
      await fetch('api/resume', { method: "POST", body: JSON.stringify({ user, webApp, chatId }) })
      webApp?.HapticFeedback?.notificationOccurred('success')
      webApp?.close()
      changeLoading()
    } catch (error) {
      console.error(error)
      webApp?.HapticFeedback?.notificationOccurred('error')
      changeLoading()
    }
  }

  const handleContact = async () => {
    try {
      changeLoading()
      webApp?.HapticFeedback.impactOccurred('light')
      await fetch('api/contact', { method: "POST", body: JSON.stringify({ user, webApp, chatId }) })
      webApp?.HapticFeedback?.notificationOccurred('success')
      webApp?.close()
      changeLoading()
    } catch (error) {
      console.error(error)
      webApp?.HapticFeedback?.notificationOccurred('error')
      changeLoading()
    }
  }

  return (
    <section className={styles.main}>
      <Image className={styles.main__image} src={ava} alt={'ava'} data-aos="zoom-in" />

      <div
        className={styles.main__name}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Nikita Chetverikov
      </div>
      <div
        className={styles.main__work}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Frontend Developer at Rbc Pro
      </div>

      <div className={styles.main__buttons}>
        <button
          disabled={isLoading}
          className={styles.main__button}
          onClick={handleResume}
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <span className={styles.main__button__text}>Resume</span>
        </button>

        <button
          disabled={isLoading}
          className={`${styles.main__button} ${styles.two}`}
          onClick={handleContact}
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <span className={styles.main__button__text}>Contact</span>
        </button>
      </div>

      {wallet && (
        <button
          className={`${styles.main__button} ${styles.three}`}
          onClick={handleDonate}
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z" fill="#FFFFFF"></path>
          </svg>
          <span className={styles.main__button__text}>Donate</span>
        </button>
      )}

      <div
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <TonConnectButton className={styles.main__button__ton} style={{ width: '100%' }} />
      </div>
    </section>
  );
};

export default Main;
