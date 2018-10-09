import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';

import {
  setCurrentUserId,
  fetchUserById,
  updateUser,
} from '../../../redux/user/userAction';

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
  Email,
  Phone,
  Role,
} from './formItems';

const styles = {};

class EditUser extends Component {
 
  state = {
    user: {},
    unchanged: true,
  };

  componentDidMount() {
    this.props.setAppBarTitle('Edit User');
    this.props.setCurrentUserId(this.props.match.params._id);
    this.props.fetchUserById(this.props.match.params._id);
    this.updateUserState({});
  }

  componentDidUpdate(prevProps) {
    this.updateUserState(prevProps);
  }

  updateUserState = prevProps => {
    if (!this.props.user) return;
    if (this.props.user === prevProps.user) return;
    this.setState({
      user: {...this.props.user}
    });
  }

  onCancel = () => {
    this.props.history.goBack();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.updateUser(this.state.user);
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
          <FormScreen title='Edit User' onCancel={this.onCancel}>
            <Form
              disabled={this.props.inProgress || this.state.unchanged}
              inProgress={this.props.inProgress}
              submitLabel="Update"
              onSubmit={this.onSubmit}
              extraButtons={extraButtons}
            >
              <Username value={this.state.user.username} onChange={this.onChange}/>
              <Fullname value={this.state.user.fullname} onChange={this.onChange}/>
              <Email value={this.state.user.email} onChange={this.onChange}/>
              <Phone value={this.state.user.phone} onChange={this.onChange}/>
              <Role value={this.state.user.role} onChange={this.onChange}/>

            </Form>
          </FormScreen>

          <Footer/>
        </ScreenContent>
      </Screen> 
    );
  }
}

const EditUserWithStyles =  withStyles(styles)(withRouter(EditUser));

export { EditUserWithStyles as EditUser };

const mapStateToProps = state => {
  return {
    inProgress: state.user.uploadInProgress,
    user: state.user.userList.find(u => u._id === state.user.currentUserId) || null,
  };
};

export default connect(
  mapStateToProps,
  { 
    setCurrentUserId,
    fetchUserById,
    updateUser,
    setAppBarTitle,
  }
)(EditUserWithStyles);