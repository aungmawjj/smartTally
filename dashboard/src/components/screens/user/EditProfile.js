import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';

import {
  updateProfile,
} from '../../../redux/auth/authAction';

import {
  setAppBarTitle,
} from '../../../redux/ui/uiAction';

import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

import Screen from '../../common/Screen';
import ScreenContent from '../../common/ScreenContent';
import Footer from '../../common/Footer';

import FormScreen from '../../common/FormScreen';
import Form from "../../common/Form";


import {
  Username,
  Fullname,
  Password,
  Email,
  Phone,
} from './formItems';

const styles = {};

class EditProfile extends Component {
 
  state = {
    user: {},
    unchanged: true,
  };

  componentDidMount() {
    this.props.setAppBarTitle('Edit Profile');
    this.updateUserState({});
  }

  componentDidUpdate(prevProps) {
    this.updateUserState(prevProps);
  }

  updateUserState = prevProps => {
    if (!this.props.loginUser) return;
    if (this.props.loginUser === prevProps.loginUser) return;
    let loginUser = {...this.props.loginUser};
    delete loginUser.role;
    this.setState({
      user: loginUser
    });
  }

  onCancel = () => {
    this.props.history.goBack();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.updateProfile(this.state.user);
  }

  onChange = e => {
    let user = {...this.state.user};
    user[e.target.id] = e.target.value;
    this.setState({
      user: user,
      unchanged: false,
    });
  }

  render() {

    const extraButtons = (
      <div style={{flexGrow: 1, textAlign: 'right'}}>
        <Button
          onClick={this.onCancel}
          variant='outlined'
          style={{color: 'red'}}
          color='inherit'
        >
          Cancel
        </Button>
      </div>
    );

    return (
      <Screen noScreenHeader>
        <ScreenContent>
          <FormScreen title='Edit Profile' onCancel={this.onCancel}>
            <Form
              disabled={this.props.inProgress || this.state.unchanged}
              inProgress={this.props.inProgress}
              submitLabel="Update"
              onSubmit={this.onSubmit}
              extraButtons={extraButtons}
            >

              <Username value={this.state.user.username} onChange={this.onChange}/>
              <Fullname value={this.state.user.fullname} onChange={this.onChange}/>
              <Password value={this.state.user.password} onChange={this.onChange}/>
              <Email value={this.state.user.email} onChange={this.onChange}/>
              <Phone value={this.state.user.phone} onChange={this.onChange}/>

            </Form>
          </FormScreen>
        
          <Footer/>
        </ScreenContent>
      </Screen> 
    );
  }
}

const EditProfileWithStyles =  withStyles(styles)(withRouter(EditProfile));

export { EditProfileWithStyles as EditProfile };

const mapStateToProps = state => {
  return {
    inProgress: state.auth.uploadInProgress,
    loginUser: state.auth.loginUser,
  };
};

export default connect(
  mapStateToProps,
  { 
    updateProfile,
    setAppBarTitle,
  }
)(EditProfileWithStyles);