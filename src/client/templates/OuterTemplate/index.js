import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import Sidebar from 'Molecules/Sidebar'

import MainTemplate from 'Templates/Main'

import { Container, SidebarContainer, PageContainer, HeaderContainer } from './styles'
import Header from 'molecules/Header'
import useWindowDimensions from 'Utils/Hooks/WindowDimension'
import { startupConstants } from 'store/Startup/constants'
import { useDispatch } from 'react-redux'

export default function OuterTemplate({ routes, children }) {
  const [currentPage, setCurrentPage] = useState({})
  const [visible, setVisible] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  const { width } = useWindowDimensions()
  const dispatch = useDispatch()
  
  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  useEffect(() => {
    dispatch({
      type:startupConstants.STARTUP
    })
  }, [])

  useEffect(() => {
    if (routes) {
      routes.forEach((element) => {
        if (location.pathname == element.url) {
          setCurrentPage(element)
        }
      })
    }
  }, [location])

  return (
    <Container>
      <HeaderContainer>
        <Header onClick={handleToggleSidebar} />
      </HeaderContainer>
      {(width > 768 || sidebarCollapsed) && (
        <SidebarContainer>
          <Sidebar onClick={handleToggleSidebar} items={routes} />
        </SidebarContainer>
      )}
      <PageContainer>
        <MainTemplate>{children}</MainTemplate>
      </PageContainer>
    </Container>
  )
}
