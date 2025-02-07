'use client';

import type React from 'react';
import Head from 'next/head';

export default function BaseHead() {
  return (
    <Head>
      {/* Global Metadata */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      {/* Set a default generator - adjust as needed */}
      <meta name="generator" content="Next.js" />

      {/* Cache-Control Meta Tag */}
      <meta httpEquiv="Cache-Control" content="max-age=3600, public" />

      {/* Font preloads */}
      <link
        rel="preload"
        href="/fonts/atkinson-regular.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/atkinson-bold.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/atkinson-italic.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
    </Head>
  );
}
