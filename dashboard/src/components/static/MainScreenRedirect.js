import { connect } from 'react-redux';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class MainScreenRedirect extends Component {

  render() {

    if(!this.props.loginUser) {
      return (<Redirect to='/login'/>);
    }

    switch (this.props.loginUser.role) {

    default:
      return (<Redirect to='/crowdAreas'/>);
      
    }
  }
}

export { MainScreenRedirect };

const mapStateToProps = state => {
  return {
    loginUser: state.auth.loginUser,
  };
};

export default connect(
  mapStateToProps
)(MainScreenRedirect);
