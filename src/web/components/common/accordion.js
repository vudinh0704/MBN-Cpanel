import { LayoutTextEllipsis } from '../layout/common';
import {
  Divider,
  List,
  ListItemButton,
  Tooltip,
  Typography,
  styled as muiStyled
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Link from 'next/link';
import styles from 'styles/styles.module.scss';

const Accordion = muiStyled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

const AccordionSummary = muiStyled(props => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      display: 'flex',
      height: '48px',
      margin: 0
    }
  })
);

const AccordionDetails = muiStyled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  display: 'flex',
  padding: '0 15px 0 55px'
}));

export const CustomAccordion = props => {
  const { expanded, group, icon, items, onChange } = props;

  return (
    <>
      <Accordion expanded={expanded} onChange={onChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {icon}
          <div style={{ width: '15px' }}></div>
          <Divider orientation="vertical" flexItem />
          <ListItemButton>
            <Typography sx={{ width: '80%' }}>{group}</Typography>
          </ListItemButton>
        </AccordionSummary>

        <AccordionDetails>
          <Divider orientation="vertical" flexItem />
          <List disablePadding sx={{ width: '100%' }}>
            {items.map((x, index) => (
              <Link key={index} href={x.link} passHref>
                <ListItemButton className={styles['styled-icon']}>
                  <div className={styles['styled-icon--fade']}>
                    <ArrowRightAltIcon />
                  </div>
                  <Tooltip title={x.name} placement="right-start">
                    <LayoutTextEllipsis>{x.name}</LayoutTextEllipsis>
                  </Tooltip>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
