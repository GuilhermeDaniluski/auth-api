import React, { useState, useEffect, useLayoutEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import { Container, Item, ItemText, StyledList, Logo } from './styles'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import Icon from '@mdi/react'
import IconButton from '@material-ui/core/IconButton'
import Colors from 'Styles/colors'
import Divider from 'atoms/Divider'
import useWindowDimensions from 'Utils/Hooks/WindowDimension'
import { mdiBackburger } from '@mdi/js'
import Row from 'Atoms/Row'

const selectedStyle = {
  background: Colors.sidebar.primaryGradient,
  boxShadow: '-4px 10px 21px -15px rgba(0,0,0,0.75)',
}

function Sidebar({ items, onClick }) {
  const { width } = useWindowDimensions()
  const history = useHistory()
  const location = useLocation()

  const handleClick = () => {
    onClick()
  }

  return (
    <Container>
      <StyledList>
        <Logo>Orkan</Logo>
        <Divider containerStyle={{ marginTop: 40, marginBottom: 40 }} />
        {items.map(({ label, url, iconPath, ...rest }) => (
          <Item
            key={label}
            label={label}
            button
            onClick={() => history.push(url)}
            selected={location.pathname == url}
            style={{ ...(location.pathname == url && selectedStyle) }}
          >
            <ListItemIcon>
              <Icon path={iconPath} size={1} color={Colors.sidebar.text} />
            </ListItemIcon>
            <ItemText primary={label} />
          </Item>
        ))}
      </StyledList>
      {width <= 768 && <Row
        style={{
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <IconButton style={{flex:1}} onClick={() => handleClick()} aria-label="delete">
          <Icon path={mdiBackburger} size={2} color={Colors.light} />
        </IconButton>
      </Row>}
    </Container>
  )
}

export default Sidebar
