import FlareIcon from '@mui/icons-material/Flare';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  padding: 5px;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  > span {
    margin-left: 15px;
    color: rgb(245, 115, 1);
    font-size: 30px;
    font-weight: 700;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

export const Title = props => {
  return (
    <Link href={props.url}>
      <TitleWrapper onClick={props.onClick}>
        <FlareIcon
          sx={{
            fontSize: 50,
            backgroundColor: 'rgb(245, 115, 1)',
            color: 'white',
            borderRadius: 15
          }}
        />
        <span>{props.name}</span>
      </TitleWrapper>
    </Link>
  );
};

Title.propTypes = {
  name: PropTypes.string,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Input: urlString or urlObject (ref: NodeJS urlObject)
  onClick: PropTypes.func.isRequired // Use cleanMessage as default
};

Title.defaultProps = {
  name: '#',
  url: '#',
  onClick: () => void {}
};
