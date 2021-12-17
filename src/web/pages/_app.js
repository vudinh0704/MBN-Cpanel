import { wrapper } from '../redux/store';
import { Layout } from '../components/layout';
import { LayoutProvider } from '../components/layout/common';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import '../styles/_common.scss';

function App({ Component, pageProps }) {
  return (
    <LayoutProvider>
      <Layout>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </Layout>
    </LayoutProvider>
  );
}

// App.getInitialProps = wrapper.getInitialAppProps(appContext => async ({ Component, ctx }) => {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return { pageProps };
// })

export default wrapper.withRedux(App);
