import styled from 'styled-components'

import Colors from 'Styles/colors'

import Divider from 'atoms/Divider'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { styled as materialStyled } from '@material-ui/core/styles'

export const Container = styled.div`
  z-index: 10;
  height: 100%;
  width: 100%;
  background-color: ${Colors.sidebar.background};
  box-shadow: 7px 0px 10px -5px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
`

export const Logo = styled.div`
  margin-top: 40px;
  padding: 10px;
  font-size: 50px;
  font-weight: 900;
  font-family: 'Americana T Extra Bold';
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.sidebar.primary};
  text-align: center;
  height: 20%;
`

export const StyledList = materialStyled(List)({
  padding: '0 10px',
  flex: 1,
})

export const Item = materialStyled(ListItem)({
  border: 0,
  borderRadius: 10,
  color: Colors.sidebar.primary,
  height: 48,
  padding: '0 30px',
  marginTop: 10,
})

export const ItemText = styled(ListItemText).attrs({
  disableTypography: true,
})({
  color: Colors.sidebar.text,
  fontFamily: 'Roboto',
  fontWeight: '0',
  fontSize: 18,
})
