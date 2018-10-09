import history from '../redux/history';
import { connect } from 'react-redux';

import { 
  getLoginUser,
} from '../redux/auth/authAction';

import {
  setViewWidth,
} from '../redux/ui/uiAction';

import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import SnackBar from './static/SnackBar';

import PrivateRoute from './common/PrivateRoute';

import MainScreenRedirect from './static/MainScreenRedirect';
import AuthLoading from './screens/AuthLoading';

// user
import Login from './screens/user/Login';
// import UserList from './screens/user/UserList';
// import NewUser from './screens/user/NewUser';
// import UserDetail from './screens/user/UserDetail';
// import EditUser from './screens/user/EditUser';
// import MyProfile from './screens/user/MyProfile';
// import EditProfile from './screens/user/EditProfile';

import CrowdAreaDef from './screens/crowdArea/CrowdAreaDef';
import CrowdAreaMap from './screens/crowdArea/CrowdAreaDef';
import Simulator from './screens/crowdArea/Simulator';

import theme from './theme';

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
  },
  main: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
};

class App extends Component {

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.props.getLoginUser();
    this.handleResize();
  }

  handleResize = () => {
    if (window.innerWidth === this.props.viewWidth) return;
    this.props.setViewWidth(window.innerWidth);
  }

  render() {
    const classes = this.props.classes;

    return (this.props.inProgress) ? (
      <AuthLoading/>
    ) : (
    
      <Router history={history}>
        <div className={classes.root}>
          <MuiThemeProvider theme={theme}>
            <div className={classes.main}>
              <Switch>

                <PrivateRoute exact path='/' component={ MainScreenRedirect }/>

                <Route exact path ='/login' component={ Login } />

                <PrivateRoute exact path='/crowdAreas' component={ CrowdAreaDef } />

                <PrivateRoute exact path='/crowdAreaMap' component={ CrowdAreaMap }/>

                <PrivateRoute exact path='/simulator' component={ Simulator }/> 

                {/* <PrivateRoute exact path='/users' component={ UserList } />
                <PrivateRoute exact path='/users/:_id' component={ UserDetail } />
                <PrivateRoute exact path='/users/:_id/edit' component={ EditUser } />
                <PrivateRoute exact path='/editProfile' component={ EditProfile } />
                <PrivateRoute exact path='/myProfile' component={ MyProfile } />
                <PrivateRoute exact path='/newUser' component={ NewUser } /> */}

              </Switch>
            </div>
            <SnackBar/>
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

const AppWithStyles = withStyles(styles)(App);

export {AppWithStyles as App};

const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized,
    inProgress: state.auth.fetchInProgress,
    viewWidth: state.ui.viewWidth,
  };
};

export default connect(
  mapStateToProps,
  { getLoginUser, setViewWidth }
)(AppWithStyles);