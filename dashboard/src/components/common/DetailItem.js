import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import theme from '../theme';

const valueStyle = {
  wordWrap: 'break-word',
};

const DetailItem = props => {
  return (
    <Grid container 
      style={{
        paddingTop: theme.spacing.unit,
      }}
    >
      <Grid item xs={5}>
        <Typography noWrap style={{color: '#555'}} color='inherit' variant='subheading'>
          { props.label }
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography className={props.valueClassName} style={valueStyle} color='default' variant='subheading'>
          { props.value }
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DetailItem;