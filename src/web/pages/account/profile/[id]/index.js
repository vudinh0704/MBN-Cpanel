import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { END } from 'redux-saga';
import Link from 'next/link';
import { NextPage } from 'next';
import { PrimaryButton } from '../../../../components/common/button';
import { connect } from 'react-redux';
import { device } from '../../../../styles/break-points';
import styled from 'styled-components';
import styles from '../../../../styles/home.module.scss';
import { useRouter } from 'next/router';
import { user } from '../../../../redux/actions';
import { wrapper } from '../../../../redux/store';

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

const Profile = props => {
  const dispatch = useDispatch();
  const router = useRouter();
  let userInfo = useSelector(state => state.user.getById, shallowEqual);
  if (!userInfo) userInfo = props.data;
  const loading = !(userInfo && userInfo.id === parseInt(router.query.id));
  console.log('loading', loading);

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          {loading && <div>Loading ... </div>}
          {!loading && (
            <div>
              <div>id: {userInfo.id}</div>
              <div>user_name: {userInfo.user_name}</div>
              <div>phone: {userInfo.phone}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
//   store.dispatch(user.getById.request({ id: query.id }))
//   store.dispatch(END);
//   await store.sagaTask.toPromise()
//   return { props: { state: store.getState() } }
// })

Profile.getInitialProps = wrapper.getInitialPageProps(
  store =>
    async ({ query, req }) => {
      if (req) {
        store.dispatch(user.getById.request({ id: query.id }));
        return {};
      }

      console.log('cookie', req.cookies);
      await store.dispatch(user.getById.request({ id: query.id }));
      store.dispatch(END);
      await store.sagaTask.toPromise();
      const data = store.getState().user.getById;
      return { data };
    }
);

export default Profile;
