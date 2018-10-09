import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { connect } from 'react-redux';

import {
  login,
} from '../../../redux/auth/authAction';

import {
  setAppBarTitle,
} from '../../../redux/ui/uiAction';

import { withStyles } from "@material-ui/core/styles";

import ScreenContent from '../../common/ScreenContent';
import Footer from '../../common/Footer';

import FormScreen from '../../common/FormScreen';
import Form from "../../common/Form";


import {
  Username,
  Password,
} from './formItems';

const styles = {};

class Login extends Component {
  state = {
    login: {},
  };
  
  componentDidMount(){
    this.props.setAppBarTitle('Welcome');
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.login);
  }

  onChange = e => {
    let login = this.state.login;
    login[e.target.id] = e.target.value;
    this.setState({
      login: login,
    });
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: '/' }};

    return this.props.isAuthorized ? (
      <Redirect to={from}/>
    ) : (
      <ScreenContent>
        <FormScreen title='Login'>
          <Form
            disabled={this.props.inProgress}
            inProgress={this.props.inProgress}
            submitLabel="Login"
            onSubmit={this.onSubmit}
          >
            <Username onChange={this.onChange} value={this.state.login.username}/>
            <Password onChange={this.onChange} value={this.state.login.password}/>
          </Form>
        </FormScreen>
      
        <Footer/>
      </ScreenContent>
    );
  }
}

const LoginWithStyles =  withStyles(styles)(withRouter(Login));

export { LoginWithStyles as Login };

const mapStateToProps = state => {
  return {
    inProgress: state.auth.uploadInProgress,
    isAuthorized: state.auth.isAuthorized,
  };
};

export default connect(
  mapStateToProps,
  { 
    login,
    setAppBarTitle,
  }
)(LoginWithStyles);