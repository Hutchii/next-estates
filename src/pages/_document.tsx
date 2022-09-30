import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#1c1840" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
