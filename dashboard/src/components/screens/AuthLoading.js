import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import theme from '../theme';

class AuthLoading extends React.Component {
  render() {
    return(
      <MuiThemeProvider theme={theme}>
        <div style={{position: 'relative', height: '100vh'}}>
          <div style={{
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform:'translate(-50%, -50%)'}}
          >
            <Typography variant='title'>Smart Tally</Typography>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AuthLoading;