import React from 'react';

// import { Container } from './styles';
import MaterialIcon from '@mdi/react'

export default function Icon({path,color, ...props}) {
  return (
    <MaterialIcon style={{ marginTop: 20, color:color }} path={path} size={1} {...props}/>
  );
}
