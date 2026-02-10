import { PropsWithChildren, Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <Suspense>
      <NuqsAdapter>
        <html>
          <body>{children}</body>
        </html>
      </NuqsAdapter>
    </Suspense>
  );
}
