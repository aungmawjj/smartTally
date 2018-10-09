
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  crowdAreaList: {
    width: '100%',
    height: '100%',
    positioin: 'relative',
    overflow: 'auto',
    WebkitOverflowScrolling: "touch",
    background: theme.palette.primary.main,
  },
  header: {
    textAlign: 'right',
    padding: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    color: '#fff'
  },
  brand: {
    background: '#000',
    fontWeight: 500,
    display: 'inline-block',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    fontStyle: 'italic'
  },
  listItem: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  branchName: {
    color: '#000',
    background: theme.palette.secondary.main,
    padding: theme.spacing.unit * 3,
  },
  population: {
    color: '#fff',
    background: '#000',
    textAlign: 'right',
    padding: theme.spacing.unit * 3,
  },
});

class ListItem extends React.Component {
  render() {

    const classes = this.props.classes;

    return (
      <li className={classes.listItem}>
        <Paper elevation={4}>
          <Grid container>
            <Grid item xs={8} lg={9} className={classes.branchName}>
              <Typography variant='title' color='inherit'>
                { this.props.crowdArea.name }
              </Typography>
            </Grid>
            <Grid item xs={4} lg={3} className={classes.population}>
              <Typography variant='title' color='inherit'>
                { this.props.crowdArea.population || 0 }
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </li>
    );
  }
}

class CrowdAreaList extends React.Component {

  render() {
    const classes = this.props.classes;

    const crowdAreaList = this.props.crowdAreaList.map(c => {
      return (
        <ListItem key={c._id} classes={ this.props.classes } crowdArea={c}/>
      );
    });

    return (
      <div className={classes.crowdAreaList}>
        <div className={classes.header}>
          <Typography variant='display1' color='inherit'>
            <Paper elevation={4} className={classes.brand}>KFC</Paper>
          </Typography>
        </div>
        <List>
          { crowdAreaList }
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(CrowdAreaList);
