import styled from 'styled-components'

import Colors from 'Styles/colors'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  background-color: ${Colors.mainContent.background};
  @media (max-width: 768px) {
    margin-right: 20px;
  }
`

export const SidebarContainer = styled.div`
  z-index: 10;
  width: 250px;
  height: 100vh;
  position: fixed;
  overflow: visible;
`
export const HeaderContainer = styled.div`
  z-index: 10;
  width: 100vw;
  height: 100px;
  position: fixed;
`


export const PageContainer = styled.div`
  height: calc(100vh);
  position: relative;
  margin-left: 250px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  @media (max-width: 768px) {
    margin-left: 0px;
    margin-top:72px;
    overflow-x: auto;
  }
`
