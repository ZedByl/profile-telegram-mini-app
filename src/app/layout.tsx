import type { Metadata } from "next";
import { YandexMetrica } from '@components/common/YandexMetrica';
import "./globals.scss";

export const metadata: Metadata = {
  title: 'ZedByl',
  description: 'Telegram mini app for ZedByl Resume',
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const id = process.env.NEXT_PUBLIC_YM_ID || '';

  return (
    <html lang="en">
      <body>
        <YandexMetrica id={id} />
        {children}
        <div className='three' id='three-id' />
      </body>
    </html>
  );
}
