import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const MyDocument = (props) => (
  <Html lang="en">
    <Head></Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);
MyDocument.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheet.collect(<App {...props} />),
    });
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheet.getStyleElement(),
    ],
  };
};

export default MyDocument;
