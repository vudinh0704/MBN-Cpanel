import { List, ListItemButton, Tooltip } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Link from 'next/link';
import PropTypes from 'prop-types';
import commonStyles from 'styles/styles.module.scss';
import styles from './dropdown.module.scss';

export const DropDown = ({ children, items }) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles['dropdown__menu']}>
        <button className={styles['dropdown__button']}>{children}</button>
      </div>
      <div className={styles['dropdown__sub-menu']}>
        <List disablePadding>
          {items.map((x, index) => (
            <Link key={'dropdown-' + index} href={x.link} passHref>
              <ListItemButton
                className={commonStyles['styled-icon']}
                sx={{ maxWidth: '100%' }}
              >
                <div className={commonStyles['styled-icon--fade']}>
                  <ArrowRightAltIcon />
                </div>
                <Tooltip title={x.name} placement="right-start">
                  <p className={styles['dropdown__text']}>{x.name}</p>
                </Tooltip>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </div>
    </div>
  );
};

DropDown.propTypes = {
  children: PropTypes.element,
  items: PropTypes.array
};
