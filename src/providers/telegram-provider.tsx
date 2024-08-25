"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';

export interface ITelegramContext {
  chatId?: string;
  webApp?: WebApp;
  user?: WebAppUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export function TelegramProvider({ children }: {
  children: React.ReactNode
}) {
  const [webApp, setWebApp] = useState<WebApp | null>(null);
  const [isTgReady, setIsTgReady] = useState(false);
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId') || '';

  useEffect(() => {
    const telegram: Telegram | null = (window as any).Telegram;
    const app = telegram?.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
    }}, [isTgReady]);

  const value = useMemo(() => {
    return webApp
      ? {
        chatId,
        webApp,
        unsafeData: webApp.initDataUnsafe,
        user: webApp.initDataUnsafe.user,
      } : {};
    }, [webApp, chatId]);

    return (
      <TelegramContext.Provider value={value}>
        <Script src="https://telegram.org/js/telegram-web-app.js" onReady={() => setIsTgReady(true)}/>
        {children}
      </TelegramContext.Provider>
    );
}

export const useTelegram = () => useContext(TelegramContext);
