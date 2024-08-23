import { Suspense } from 'react';
import HomePage from '@components/pages/Home';
import { TelegramProvider } from '@providers/telegram-provider';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export default function Home() {

  return (
    <Suspense>
      <TelegramProvider>
        <HomePage />
      </TelegramProvider>
    </Suspense>
  );
}
