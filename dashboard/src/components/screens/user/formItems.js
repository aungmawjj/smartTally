import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import constants from '../../../utils/constants';

export const Username = props => (
  <TextField
    id='username'
    label='Username'
    margin='normal'
    value={props.value || ''}
    onChange={props.onChange}
    fullWidth
    required
  />
);


export const Fullname = props => (
  <TextField
    id="fullname"
    label="Fullname"
    margin="normal"
    value={props.value || ""}
    onChange={props.onChange}
    InputProps={{className: 'myanmar3'}}
    fullWidth
    required
  />
);

export const Password = props => (
  <TextField
    id='password'
    label='Password'
    type='password'
    margin='normal'
    value={props.value || ''}
    onChange={props.onChange}
    fullWidth
    required
  />
);



export const Email = props => (
  <TextField
    id="email"
    label="Email"
    type='email'
    margin="normal"
    value={props.value || ""}
    onChange={props.onChange}
    fullWidth
  />
);



export const Phone = props => (
  <TextField
    id="phone"
    label="Phone"
    type='number'
    margin="normal"
    value={props.value || ""}
    onChange={props.onChange}
    fullWidth
  />
);

function onSelectChange(e, id, onChange) {
  e.target.id = id;
  onChange(e);
}

const selectItems = values => {
  return values.map(value => (
    <MenuItem key={value} value={value}>{value}</MenuItem>
  ));
};

export const Role = props => (
  <FormControl
    fullWidth
    required
    style={{
      marginTop: 16,
      marginBottom: 8,
    }}
  >
    <InputLabel htmlFor="role">Role</InputLabel>
    <Select
      fullWidth
      required
      name='Role'
      id='role'
      value={props.value || ''}
      onChange={e => onSelectChange(e, 'role', props.onChange)}
    >
      {selectItems([
        constants.ROLE_ADMIN,
        constants.ROLE_ACCOUNTANT,
        constants.ROLE_WAREHOUSE,
        constants.ROLE_DELIVERYAGENT,
      ])}
    </Select>
  </FormControl>
);