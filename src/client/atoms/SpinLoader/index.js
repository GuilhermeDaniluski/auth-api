import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

// import { Container } from './styles';

export default function SpinLoader({color}) {
  return (
    <CircularProgress style={{color: color,}}/>
  );
}
