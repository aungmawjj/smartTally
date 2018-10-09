import React from 'react';
import TextField from '@material-ui/core/TextField';

export const Name = props => (
  <TextField
    id='name'
    label='Township Name'
    margin='normal'
    value={props.value || ''}
    onChange={props.onChange}
    InputProps={{className: 'myanmar3'}}
    fullWidth
    required
  />
);

export const Code = props => (
  <TextField
    id='code'
    label='Township code'
    margin='normal'
    value={props.value || ''}
    onChange={props.onChange}
    fullWidth
    required
  />
);