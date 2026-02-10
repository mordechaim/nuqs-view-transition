import { PropsWithChildren } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <NuqsAdapter>
      <html>
        <body>{children}</body>
      </html>
    </NuqsAdapter>
  );
}
