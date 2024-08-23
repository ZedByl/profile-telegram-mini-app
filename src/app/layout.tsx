import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: 'ZedByl Resume',
  description: 'Telegram mini app for ZedByl integration',
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
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
