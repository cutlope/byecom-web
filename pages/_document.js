import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import defaultTheme from '../theme/defaultTheme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={defaultTheme.palette.primary.main} />
          <link rel="shortcut icon" href="/favicon.png" />
          <meta
            name="keywords"
            content="Responsive, HTML5, admin theme, business, professional, React, web design, CSS3, JSS"
          />

          <meta name="msapplication-TileColor" content="#6200EE" />
          <meta name="msapplication-TileImage" content="/logo512.png" />
          <meta name="theme-color" content="#6200EE" />
          <meta name="description" content="Web site created using create-react-app" />
          <meta property="og:description" content="Web site created using create-react-appn" />
          <meta property="og:title" content="Byecom - Admin Dashboard" />
          <meta property="og:image" content="/logo512.png" />
          <meta property="og:site_name" content="Byecom Admin Template" />
          <meta name="keywords" content="react,react-component,stickies" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Byecom - Admin Dashboard" />
          <meta name="twitter:description" content="Web site created using create-react-appn" />

          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />

          <link rel="stylesheet" href="/vendors/flag/sprite-flags-24x24.css" />
          <link rel="stylesheet" href="/vendors/fonts.css" />
          <link rel="stylesheet" href="/vendors/style.css" />
          <link rel="stylesheet" href="/vendors/weather-icons/css/weather-icons.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>

          <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places,geometry,drawing&key=AIzaSyBgqAomc9Vukt12AV3tJLasBnNehSNKuOY"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. apps.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. apps.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. apps.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. apps.getInitialProps
  // 2. page.getInitialProps
  // 3. apps.render
  // 4. page.render

  // Render apps and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the apps and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
