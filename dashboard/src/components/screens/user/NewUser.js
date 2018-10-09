import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';

import {
  createUser,
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
  Password,
  Email,
  Phone,
  Role,
} from './formItems';

const styles = {};

class NewUser extends Component {
 
  state = {
    user: {},
  };

  componentDidMount() {
    this.props.setAppBarTitle('New User');
  }

  onCancel = () => {
    this.props.history.goBack();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.createUser(this.state.user);
  }

  onChange = e => {
    let user = {...this.state.user};
    user[e.target.id] = e.target.value;
    this.setState({
      user: user,
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
          <FormScreen title='New User' onCancel={this.onCancel}>
            <Form
              disabled={this.props.inProgress}
              inProgress={this.props.inProgress}
              submitLabel="Create"
              onSubmit={this.onSubmit}
              extraButtons={extraButtons}
            >

              <Username value={this.state.user.username} onChange={this.onChange}/>
              <Fullname value={this.state.user.fullname} onChange={this.onChange}/>
              <Password value={this.state.user.password} onChange={this.onChange}/>
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

const NewUserWithStyles =  withStyles(styles)(withRouter(NewUser));

export { NewUserWithStyles as NewUser };

const mapStateToProps = state => {
  return {
    inProgress: state.user.uploadInProgress,
  };
};

export default connect(
  mapStateToProps,
  { 
    createUser,
    setAppBarTitle,
  }
)(NewUserWithStyles);