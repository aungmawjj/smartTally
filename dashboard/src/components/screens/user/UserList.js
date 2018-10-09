import { connect } from 'react-redux';

import {
  fetchUserList,
} from '../../../redux/user/userAction';

import {
  setAppBarTitle,
  setScrollPosition,
} from '../../../redux/ui/uiAction';

import config from '../../../config';

import React from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';


import Screen from '../../common/Screen';
import ScreenHeader from '../../common/ScreenHeader';
import ScreenContent from '../../common/ScreenContent';
import Footer from '../../common/Footer';

import BottomFab from '../../common/BottomFab';

const styles = theme => ({
  medianIcon: {
    fontSize: 32,
    marginRight: 0,
  },
});

class UserList extends React.Component {

  componentDidMount() {
    this.props.setAppBarTitle('Users');  
    this.props.fetchUserList();
  }

  onAdd = e => {
    this.props.history.push('/newUser');
  }

  onListItemClick = _id => {
    setTimeout(() => this.props.history.push(`/users/${_id}`), config.ON_CLICK_DELAY);
  }

  headerButtons = [
    {
      label: 'add',
      icon: (<AddIcon/>),
      onClick: this.onAdd
    }
  ]

  render() {
    const classes = this.props.classes;

    const userList = this.props.userList.map(user => {
      return (
        <ListItem button key={user._id} onClick={() => this.onListItemClick(user._id)}>
          <ListItemIcon className={classes.medianIcon}>
            <AccountCircle/>
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{className: 'myanmar3'}} primary={user.fullname} secondary={user.role}/>
        </ListItem>
      );
    });

    return (
      <Screen setTopNav>
        <ScreenHeader buttons={this.headerButtons}/>
        <ScreenContent screenId='UserList'>
          <Grid container justify='center'>  
            <Grid item xs={12} sm={10} lg={8}>
              <List>
                { userList }
              </List>
            </Grid>
          </Grid>

          <Footer/>
        </ScreenContent>
        <BottomFab onClick={this.onAdd} icon={<AddIcon/>}/>
      </Screen>
    );
  }
}

const UserListWithStyles = withStyles(styles)(UserList);

export { UserListWithStyles as UserList };

const mapStateToProps = state => {
  return {
    userList: state.user.userList,
    viewWidth: state.ui.viewWidth,
    scroll: state.ui.scroll,
  };
};

export default connect(
  mapStateToProps,
  { 
    fetchUserList,
    setAppBarTitle,
    setScrollPosition,
  }
)(UserListWithStyles);