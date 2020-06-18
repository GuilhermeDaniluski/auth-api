import React, { useEffect } from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import OuterTemplate from 'Templates/OuterTemplate'
import Home from 'Pages/Home'
import Setup from 'Pages/Setup'
import SnackBarWithRedux from 'atoms/SnackBarWithRedux'

import GlobalFonts from 'Styles/fonts.js'

import { mdiHome, mdiCog } from '@mdi/js'

import createStore from 'Store'
import { startupConstants } from 'store/Startup/constants'

const routes = [
  {
    label: 'Dashboard',
    url: '/',
    render: <Home />,
    iconPath: mdiHome,
  },
  {
    label: 'Configuração',
    url: '/setup',
    render: <Setup />,
    iconPath: mdiCog,
  },
]

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#23708A',
    },
  },
})

export const { store } = createStore()

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalFonts />
        <SnackBarWithRedux />
        <Router>
          <OuterTemplate routes={routes}>
            <Switch>
              {routes.map((el) => {
                return (
                  <Route key={el.label} exact path={el.url}>
                    {el.render}
                  </Route>
                )
              })}
              <Route>
                <Home />
              </Route>
            </Switch>
          </OuterTemplate>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}
