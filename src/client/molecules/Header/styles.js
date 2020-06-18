import styled from 'styled-components'

import Colors from 'Styles/colors'

export const Container = styled.div`
  z-index: 10;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${Colors.sidebar.background};
  box-shadow: 7px 0px 10px -5px rgba(0, 0, 0, 0.75);
  ${(props) => (props.visible ? 'visibility:visible;' : 'visibility:collapse;')}
`

export const Logo = styled.div`
  flex: 1;
  font-size: 50px;
  font-weight: 900;
  font-family: 'Americana T Extra Bold';
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.sidebar.primary};
  text-align: center;
  height: 100%;
  margin-right:40px;
`
