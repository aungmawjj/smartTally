
import { connect } from 'react-redux';
import {
  toggleNavDrawer,
} from '../../redux/ui/uiAction';

import {
  logout,
} from '../../redux/auth/authAction';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';

const styles = {

  appBar: {
    width: `calc(100% - 300px)`,
  },

  menuButton: {
    marginLeft: -12,
  },

  accountIcon: {
    marginRight: -12,
  }
};

class TopNavBar extends Component {

  state = {
    anchorEl: null,
  }

  onMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  onClose = () => {
    this.setState({ anchorEl: null });
  };

  onLogout = async () => {
    this.setState({ anchorEl: null });
    if(window.confirm('Are you sure to logout?')){
      this.props.logout();
    }
  }

  onProfileClick = async () => {
    this.setState({ anchorEl: null});
    this.props.history.replace('/myProfile');
  }


  render() {
    const classes = this.props.classes;
    const anchorEl = this.state.anchorEl;
    const open = Boolean(anchorEl);

    const toolbar = (
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            onClick={() => this.props.toggleNavDrawer(true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="title" color="inherit" noWrap>
          { this.props.appBarTitle }
        </Typography>
        <div style={{flexGrow: 1}}></div>
        { this.props.isAuthorized && (
          <div>
            <IconButton
              className={classes.accountIcon}
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.onMenu}
              color="inherit"
            >
              <Icon color='inherit'>
                <AccountCircle/>
              </Icon>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.onClose}
            >
              <MenuItem onClick={this.onProfileClick}>Profile</MenuItem>
              <MenuItem onClick={this.onLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) }
      </Toolbar>
    );

    return this.props.topNavOpen && (
      <div>
        <Hidden mdUp>
          <Fade in>
            <AppBar position='absolute'>
              { toolbar }
            </AppBar>
          </Fade>
        </Hidden>
        <Hidden smDown>
          <Fade in>
            <AppBar position='absolute' className={classes.appBar}>
              { toolbar }
            </AppBar>
          </Fade>
        </Hidden>
      </div>
    );
  }
}

TopNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TopNavBarWithStyles = withStyles(styles)(withRouter(TopNavBar));

export {TopNavBarWithStyles as TopNavBar};


const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized,
    appBarTitle: state.ui.appBarTitle,
    topNavOpen: state.ui.topNavOpen,
  };
};

export default connect(
  mapStateToProps,
  { toggleNavDrawer, logout }
)(TopNavBarWithStyles);