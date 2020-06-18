import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function InputField(props) {
  return (
    <TextField style={{flex:1, margin:10}} {...props}/>
  );
}
