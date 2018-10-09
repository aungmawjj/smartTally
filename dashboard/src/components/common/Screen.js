import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import {
  toggleTopNavBar,
  toggleScreenHeader,
} from '../../redux/ui/uiAction';

import {
  logout,
} from '../../redux/auth/authAction';

import {
  fetchCrowdAreaList,
} from '../../redux/crowdArea/crowdAreaAction';

import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import theme from '../theme';

import MenuFab from './MenuFab';

const styles = {
  screen: {
    position: 'relative',
    height: '100%',
  },

};

class Screen extends React.Component {

  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
  }

  onMenuClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  onNavClick = (path) => {
    this.props.history.push(path);
  }

  onLogoutClick = async () => {
    this.setState({ anchorEl: null });
    if(window.confirm('Are you sure to logout?')){
      this.props.logout();
    }
  }

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    this.fetchJob = setInterval(this.props.fetchCrowdAreaList, 1000);
  }

  componentWillUnmount() {
    console.log('clear interval');
    clearInterval(this.fetchJob);
    delete this.fetchJob;
  }

  render() {
    const classes = this.props.classes;

    return (
      <Fade in timeout={{
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen
      }}>
        <div className={classes.screen}>
          <MenuFab onClick={this.onMenuClick}/>
          <Menu
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.onMenuClose}
          >
            <MenuItem onClick={e => this.onNavClick('/crowdAreas')}>Dashboard</MenuItem>
            <MenuItem onClick={e => this.onNavClick('/simulator')}>Simulator</MenuItem>
            <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem>
          </Menu>
          {this.props.children}
        </div>
      </Fade>
    );
  }
}

const ScreenWithStyles = withStyles(styles)(Screen);

const mapStateToProps = state => {
  return {
    topNavOpen: state.ui.topNavOpen,
    viewWidth: state.ui.viewWidth,
  };
};

export default withRouter(connect(
  mapStateToProps,
  { toggleTopNavBar, toggleScreenHeader, fetchCrowdAreaList, logout }
)(ScreenWithStyles));