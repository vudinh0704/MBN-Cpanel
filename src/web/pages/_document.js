import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const API_ROOT = process.env.API_ROOT || '';
const CDN_URL = process.env.CDN_URL || '';

class MyDocument extends Document {
  // static getInitialProps({ renderPage }) {
  //   // Step 1: Create an instance of ServerStyleSheet
  //   const sheet = new ServerStyleSheet();

  //   // Step 2: Retrieve styles from components in the page
  //   const page = renderPage((App) => (props) =>
  //     sheet.collectStyles(<App {...props} />),
  //   );

  //   // Step 3: Extract the styles as <style> tags
  //   const styleTags = sheet.getStyleElement();

  //   // Step 4: Pass styleTags as a prop
  //   return { ...page, styleTags };
  // }

  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // useful for wrapping the whole react tree
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
          // useful for wrapping in a per-page basis
          enhanceComponent: Component => Component
        });

      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html id={this.props.isOnCPanel ? 'cpanel-root' : null} lang="vi">
        <Head>
          <link
            rel="preconnect"
            href={API_ROOT}
            crossOrigin="use-credentials"
          />
          <link rel="dns-prefetch" href={API_ROOT} />
          <link rel="preconnect" href={CDN_URL} crossOrigin="" />
          <link rel="dns-prefetch" href={CDN_URL} />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com/"
            crossOrigin=""
          />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com/"
            crossOrigin=""
          />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com/" />
          <link
            rel="preconnect"
            href="https://www.googleadservices.com/"
            crossOrigin=""
          />
          <link rel="dns-prefetch" href="https://www.googleadservices.com/" />
          <link
            rel="preconnect"
            href="https://www.googletagmanager.com/"
            crossOrigin=""
          />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com/" />
          <link
            rel="preconnect"
            href="https://www.google-analytics.com/"
            crossOrigin=""
          />
          <link rel="dns-prefetch" href="https://www.google-analytics.com/" />
          <link
            rel="preconnect"
            href="https://connect.facebook.net/"
            crossOrigin=""
          />
          <link rel="dns-prefetch" href="https://connect.facebook.net/" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `setTimeout(function() {
            const gtmf = document.createElement("iframe")
            gtmf.src="https://www.googletagmanager.com/ns.html?id=GTM-WC9T99"
            gtmf.width=0;gtmf.height=0;gtmf.style.display="none";gtmf.style.visibility="hidden"
            document.body.appendChild(gtmf)
            }, 2000);
            `
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `setTimeout(function() {
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WC9T99')
            }, 2000)`
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
