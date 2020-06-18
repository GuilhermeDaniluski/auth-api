import React, { useState, useLayoutEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import { Container, Item, ItemText, StyledList, Logo } from './styles'

import Icon from '@mdi/react'
import IconButton from '@material-ui/core/IconButton'
import Colors from 'Styles/colors'
import Divider from 'atoms/Divider'
import useWindowDimensions from 'Utils/Hooks/WindowDimension'
import { mdiMenu  } from '@mdi/js';

function Header({ items, onClick}) {
  const [visible, setVisible] = useState(width < 768)
  const { width } = useWindowDimensions()

  useLayoutEffect(() => {
    if (width <= 768) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [width])

  const handleClick = () =>{
    onClick()
  }

  return (
    <Container visible={visible}>
      <IconButton onClick={() =>handleClick()} style={{marginLeft:20, }} aria-label="delete">
        <Icon path={mdiMenu} size={2} color={Colors.light} />
      </IconButton>
      <Logo>Orkan</Logo>
    </Container>
  )
}

export default Header
