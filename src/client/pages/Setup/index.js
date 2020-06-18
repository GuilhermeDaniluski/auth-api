import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CardContainer from 'Atoms/CardContainer'
import Column from 'Atoms/Column'

import { LoginContainer, ContentContainer } from './styles'
import LoginCard from 'molecules/LoginCard'
import colors from 'Styles/colors'

import { refreshToken } from 'services/Auth'
import { authConstants } from 'store/Auth/constants'
import { alertConstants } from 'Store/Alert/constants'
import CloudSetupCard from 'molecules/CloudSetupCard'
import LocalSetupCard from 'molecules/LocalSetupCard'
import UserSetupCard from 'molecules/UserSetupCard'


const masonryOptions = {
  gutter: 0,
  originTop: false
}

export default function Setup() {
  const [showLogin, setShowLogin] = useState(false)
  const { isLogged } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  let containerRef = useRef(null)


  const checkLogin = async () => {
    let response = await refreshToken()
    if (response.error) {
      setShowLogin(true)
      return
    }
    setShowLogin(false)
  }

  useEffect(() => {
    let isCancelled = false
    if (isLogged) {
      checkLogin()
    } else {
      setShowLogin(true)
    }
    return () => {
      isCancelled = true
    }
  }, [isLogged])
  



  const handleResize = () => {
    if (containerRef.performLayout) {
      containerRef.performLayout()
    }
  }

  return (
    <>
      {showLogin && (
        <LoginContainer>
          <LoginCard colorsObject={colors.card.colors[0]} />
        </LoginContainer>
      )}
      {!showLogin && (
        <ContentContainer
          options={masonryOptions}
          updateOnEachImageLoad={true}
          ref={(ref) => {
            containerRef = ref
          }}
        >
          <CloudSetupCard onChange={handleResize} colorsObject={colors.card.colors[0]} />
          <LocalSetupCard onChange={handleResize} colorsObject={colors.card.colors[1]} />
          <UserSetupCard onChange={handleResize} colorsObject={colors.card.colors[4]}/>
        </ContentContainer>
      )}
    </>
  )
}
