import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import colors from 'Styles/colors';

export const Container = styled.div`
  display:flex;
  position:absolute;
  margin-left:-20px;
  margin-top:-35px;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  box-shadow: 2px 0px 5px 2px rgba(0,0,0,0.2);
  border-radius:35px;
  padding:5px;
  background-color:${colors.secondary};
`;

export const ButtonWithShadow = styled(IconButton)`
    box-shadow: 2px 0px 5px 2px rgba(0,0,0,0.2);

`;

export const Button = styled(IconButton)`
    margin-top:10px;
`;

export const ButtonContainer = styled.div`
  padding:5px;
  margin-top:-20px;
  padding-top:20px;
  padding-bottom:10px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
`;