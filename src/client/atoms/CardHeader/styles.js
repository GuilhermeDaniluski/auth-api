import styled from "styled-components";

import Colors from "Styles/colors";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow:visible;
`;

export const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content:flex-start;
  align-items:center;
  color: ${Colors.card.title};
  font-family: "Roboto";
  font-size:20px;
  padding-left:30px;
  padding-right:30px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  float:left;
  padding:20px;
  margin-top:-20px;
  margin-left:20px;
  margin-bottom:20px;
  border-radius:6px;
  background:${props => props.colors.gradient};
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px ${props => props.colors.color};
`;