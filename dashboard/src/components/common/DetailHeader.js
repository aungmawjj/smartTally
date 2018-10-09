import React from 'react';
import Hidden from '@material-ui/core/Hidden';

import theme from '../theme';

const DetailHeader = props => {
  return (
    <div style={{
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit,
      display: 'flex',
      alignItems: 'flex-end',
    }}>
      
      <Hidden only='xs'>
        <div style={{height: 48}}></div>
      </Hidden>

      { props.children }
    </div>
  );
};

export default DetailHeader;