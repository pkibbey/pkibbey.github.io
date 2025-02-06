import type React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  description: string;
}

const BaseHead: React.FC<Props> = ({ title, description }) => {
  // Compute the canonical URL and current URL using browser globals.
  const currentURL = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalURL =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : '';

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

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalURL} />

      {/* Primary Meta Tags */}
      <title>{title} | Phineas-dev</title>
      <meta name="title" content={`${title} | Phineas-dev`} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentURL} />
      <meta property="og:title" content={`${title} | Phineas-dev`} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentURL} />
      <meta property="twitter:title" content={`${title} | Phineas-dev`} />
      <meta property="twitter:description" content={description} />

      <link href="/out/styles.css" rel="stylesheet" />
    </Head>
  );
};

export default BaseHead;
