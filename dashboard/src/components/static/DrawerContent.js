import { connect } from 'react-redux';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AccountCircle from '@material-ui/icons/AccountCircle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import UsersIcon from '@material-ui/icons/AssignmentInd';
import StoreIcon from '@material-ui/icons/Store';
import CityIcon from '@material-ui/icons/LocationCity';
import RouteIcon from '@material-ui/icons/Directions';
import SKUIcon from '@material-ui/icons/Ballot';
import DDOIcon from '@material-ui/icons/LocalShipping';

import constants from '../../utils/constants';
import config from '../../config';

const styles = theme => ({
  profileLink: {
    paddingTop: 24,
    paddingBottom: 24,
    textTransform: 'none',
    display: 'block',
    width: '100%',
  },
  accountAvatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    marginBottom: 8,
  },
});

class DrawerContent extends Component {

  onProfileClick = async () => {
    setTimeout(() => this.props.history.replace('/myProfile'), config.ON_CLICK_DELAY);
  }

  onNavClick = (path) => {
    setTimeout(() => this.props.history.replace(path), 300);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div style={{paddingBottom: 56}}>

        <Toolbar>
          <Avatar src='/smartsale_small.png' alt='' style={{marginRight: 16}}/>
          <Typography variant="title" color="inherit" noWrap>
            { constants.APP_NAME }
          </Typography>
        </Toolbar>

        <Divider/>

        <Button  onClick={this.onProfileClick} className={classes.profileLink}>

          <Grid container justify='center'>
            <Avatar className={classes.accountAvatar}>
              <AccountCircle/>
            </Avatar>
          </Grid>

          <Grid container justify='center'>
            <Typography className='myanmar3' color='default' variant='subheading'>
              { this.props.loginUser ? this.props.loginUser.fullname : 'No Current User'}
            </Typography>
          </Grid>

          <Grid container justify='center' style={{color: '#777'}}>
            <Typography color='inherit' variant='body1'>
              { this.props.loginUser ? this.props.loginUser.role : ''}
            </Typography>
          </Grid>

        </Button>

        <Divider/>
        
        <List>
          <ListItem button onClick={() => this.onNavClick('/users')}>
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>

          <ListItem button onClick={() => this.onNavClick('/customers')}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>

          <ListItem button onClick={() => this.onNavClick('/townships')}>
            <ListItemIcon>
              <CityIcon />
            </ListItemIcon>
            <ListItemText primary="Townships" />
          </ListItem>

          <ListItem button onClick={() => this.onNavClick('/routes')}>
            <ListItemIcon>
              <RouteIcon />
            </ListItemIcon>
            <ListItemText primary="Routes" />
          </ListItem>

          <ListItem button onClick={() => this.onNavClick('/skus')}>
            <ListItemIcon>
              <SKUIcon />
            </ListItemIcon>
            <ListItemText primary="SKU" />
          </ListItem>

          <ListItem button onClick={() => this.onNavClick('/ddos')}>
            <ListItemIcon>
              <DDOIcon />
            </ListItemIcon>
            <ListItemText primary="Delivery Assignments" />
          </ListItem>

        </List>
      </div>
    );
  }
}

const DrawerContentWithStyles = withStyles(styles)(withRouter(DrawerContent));

const mapStateToProps = state => {
  return {
    loginUser: state.auth.loginUser
  };
};

export default connect(
  mapStateToProps
)(DrawerContentWithStyles);