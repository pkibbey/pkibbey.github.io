import ASCIIArt from '@/components/ASCIIArt';
import BaseHead from '@/components/BaseHead';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <BaseHead title="title" description="description" />
      <body className="dark">
        <div className="min-h-screen flex flex-col bg-gray-200 dark:bg-gray-900 text-gray-950 dark:text-gray-50 transition-colors duration-300">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only absolute top-0 left-0 w-full py-4 text-center text-white bg-cyan-500"
          >
            Skip to content
          </a>
          <Header />
          <main
            id="main-content"
            tabIndex={-1}
            className="container max-w-4xl mx-auto prose-lg px-4 md:px-8 min-h-stretch py-8"
          >
            <ASCIIArt className="mt-6" />
            <h1 className="heading-1 mb-8 mt-4 max-w-3xl">title</h1>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
