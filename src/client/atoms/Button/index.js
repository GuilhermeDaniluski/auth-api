import React from 'react'

import MUIbutton from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -12,
  },
}))

export default function Button({ children, loading, ...props }) {
  const classes = useStyles()

  return (
    <>
      <MUIbutton variant="contained" color="primary" disabled={loading} {...props}>
        {children}
      </MUIbutton>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </>
  )
}
