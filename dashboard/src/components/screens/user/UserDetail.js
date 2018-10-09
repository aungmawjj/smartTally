import { connect } from 'react-redux';

import {
  setCurrentUserId,
  fetchUserById,
  deleteUser,
} from '../../../redux/user/userAction';

import {
  setAppBarTitle,
} from '../../../redux/ui/uiAction';

import React from 'react';

import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles } from '@material-ui/core/styles';


import Screen from '../../common/Screen';
import ScreenHeader from '../../common/ScreenHeader';
import ScreenContent from '../../common/ScreenContent';
import Footer from '../../common/Footer';

import DetailItem from '../../common/DetailItem';
import theme from '../../theme';

const styles = theme => ({

});

class UserDetail extends React.Component {

  componentDidMount() {
    this.props.setAppBarTitle('User Detail');
    this.props.setCurrentUserId(this.props.match.params._id);
    this.props.fetchUserById(this.props.match.params._id);
  }

  onEdit = () => {
    this.props.history.push(`/users/${this.props.user._id}/edit`);
  }

  onDelete = () => {
    if(window.confirm(`Are you sure delete User: ${this.props.user.username} ?`)){
      this.props.deleteUser(this.props.user._id);
    }
  }

  onBack = () => {
    this.props.history.goBack();
  }

  headerButtons = [
    {
      icon: (<DeleteIcon/>),
      label: 'delete',
      onClick: this.onDelete,
    },
    {
      icon: (<EditIcon/>),
      label: 'edit',
      onClick: this.onEdit,
    }
  ]

  render() {

    return this.props.user && (
      <Screen setScreenHeader>
        <ScreenHeader onBack={this.onBack} buttons={this.headerButtons}/>
        <ScreenContent>

          { (this.props.viewWidth > theme.breakpoints.values.sm) && <div style={{height: 32}}/>}

          <Grid container justify='center'>  
            <Grid item xs={12} sm={10} lg={8}>

              <CardHeader
                title={this.props.user.fullname}
                titleTypographyProps={{className: 'myanmar3'}}
              />

              <CardContent>
                <DetailItem label='username' value={this.props.user.username}/>
                <DetailItem label='email' value={this.props.user.email}/>
                <DetailItem label='phone' value={this.props.user.phone}/>
                <DetailItem label='role' value={this.props.user.role}/>
              </CardContent>

            </Grid>
          </Grid>

          <Footer/>
        </ScreenContent>
      </Screen>
    );
  }
}

const UserDetailWithStyles = withStyles(styles)(UserDetail);

export { UserDetailWithStyles as UserDetail };

const mapStateToProps = state => {
  return {
    user: state.user.userList.find(u => u._id === state.user.currentUserId) || null,
    viewWidth: state.ui.viewWidth,
  };
};

export default connect(
  mapStateToProps,
  {
    setCurrentUserId,
    fetchUserById,
    setAppBarTitle,
    deleteUser,
  }
)(UserDetailWithStyles);