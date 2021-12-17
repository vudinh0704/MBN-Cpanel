import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { user } from '../../redux/actions';
import { PrimaryButton } from '../../components/common/button';
import styles from '../../styles/home.module.scss';
import { device } from '../../styles/break-points';

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

const Account = () => {
  const dispatch = useDispatch();
  const compactCpanels = useSelector(state => state.user.compactCpanels);
  useEffect(() => {
    dispatch(user.compactCpanels.request());
  }, [dispatch]);

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <ul>
            {compactCpanels &&
              compactCpanels.map(item => (
                <li key={item.id}>
                  <Link href={`/account/profile/${item.id}`}>
                    <a>{item.user_name}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Account;
