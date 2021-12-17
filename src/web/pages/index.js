import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '../redux/store';
import Link from 'next/link';
import styled, { StyleSheetManager } from 'styled-components';
import { userAction } from '../redux/actions';
import { PrimaryButton } from '../components/common/button';
import styles from '../styles/home.module.scss';
import { device } from '../styles/break-points';
import GlobalStyle from '../styles/global-style';

const Container = styled.div`
  background: #0671ca;
  padding: 8px 24px;
  border-radius: 8px;
  border: 1px;
  margin-left: 1rem;
  margin-right: 1rem;
  box-shadow: 5px 5px 20px rgb(0 0 0 / 10%);
  padding: 1rem;
  width: 100%;
  ${device.up.md`
    background: #ccc;
  `};
`;

const Index = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  // useEffect(() => {
  //   dispatch(startClock())
  // }, [dispatch])

  const loginHandler = () => {
    dispatch(
      userAction.login.request({
        phone: '0000000001',
        password: '123456',
        captcha: 'captcha'
      })
    );
  };
  const logoutHandler = () => {
    dispatch(userAction.logout.request({}));
  };
  const is_login = userState.is_login;

  return (
    <>
      <GlobalStyle />
      <StyleSheetManager disableVendorPrefixes>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            {' '}
            Hello!
            <div>login: {is_login ? 'true' : 'false'} </div>
            {is_login === false && (
              <>
                <PrimaryButton onClick={loginHandler}>Login</PrimaryButton>
              </>
            )}
            {is_login && (
              <>
                <PrimaryButton onClick={logoutHandler}>Logout</PrimaryButton>
              </>
            )}
            <div>
              <Link href={`/account/`}>
                <a>Tài khoản</a>
              </Link>
            </div>
          </div>

          <Container>
            <PrimaryButton onClick={loginHandler}>Login</PrimaryButton>
          </Container>
          <Container />
          <Container />
          <div className="container">
            <PrimaryButton onClick={loginHandler}>Login</PrimaryButton>
          </div>
          <div className={styles['cardContainer--card1']}>
            <PrimaryButton onClick={loginHandler}>Login 2</PrimaryButton>
          </div>
        </div>
      </StyleSheetManager>
    </>
  );
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch({ type: 'LOGIN' })
// })

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   // store.dispatch(tickClock(false))

//   // if (!store.getState().placeholderData) {
//   //   store.dispatch(loadData())
//   //   store.dispatch(END)
//   // }
//   console.log(store)
//   //await store.sagaTask.toPromise()
// })

export default Index;
