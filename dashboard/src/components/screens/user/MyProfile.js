import { connect } from 'react-redux';

import {
  setAppBarTitle,
} from '../../../redux/ui/uiAction';

import React from 'react';

import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import EditIcon from '@material-ui/icons/Edit';

import { withStyles } from '@material-ui/core/styles';

import Screen from '../../common/Screen';
import ScreenHeader from '../../common/ScreenHeader';
import ScreenContent from '../../common/ScreenContent';
import Footer from '../../common/Footer';

import BottomFab from '../../common/BottomFab';

import DetailItem from '../../common/DetailItem';
import theme from '../../theme';


const styles = theme => ({

  leftIconButton: {
    marginLeft: -12,
  },

  rightIconButton: {
    marginRight: -12,
  },

  headerButton:{
    marginLeft: 24,
  },

  leftIcon: {
    marginLeft: theme.spacing.unit,
  },

  largeIcon: {
    fontSize: 48,
  },
});

class MyProfile extends React.Component {

  componentDidMount() {
    this.props.setAppBarTitle('My Profile');
  }

  onEdit = () => {
    this.props.history.push('/editProfile');
  }

  onBlack = () => {
    this.props.history.goBack();
  }

  headerButtons = [
    {
      icon: (<EditIcon/>),
      label: 'edit',
      onClick: this.onEdit,
    }
  ]

  render() {
    return this.props.loginUser && (
      <Screen setTopNav>
        <ScreenHeader onBack={this.onBack} buttons={this.headerButtons}/>
        <ScreenContent>

          { (this.props.viewWidth > theme.breakpoints.values.sm) && <div style={{height: 32}}/>}

          <Grid container justify='center'> 
            <Grid item xs={12} sm={10} lg={8}>

              <CardHeader
                title={this.props.loginUser.fullname}
                titleTypographyProps={{className: 'myanmar3'}}
              />

              <CardContent>
                <DetailItem label='username' value={this.props.loginUser.username}/>
                <DetailItem label='email' value={this.props.loginUser.email}/>
                <DetailItem label='phone' value={this.props.loginUser.phone}/>
                <DetailItem label='role' value={this.props.loginUser.role}/>
              </CardContent>

            </Grid>
          </Grid>

          <Footer/>
        </ScreenContent>

        <BottomFab onClick={this.onEdit} icon={<EditIcon/>}/>
      </Screen>
    );
  }
}

const MyProfileWithStyles = withStyles(styles)(MyProfile);

export { MyProfileWithStyles as MyProfile };

const mapStateToProps = state => {
  return {
    loginUser: state.auth.loginUser,
    viewWidth: state.ui.viewWidth,
  };
};

export default connect(
  mapStateToProps,
  { 
    setAppBarTitle,
  }
)(MyProfileWithStyles);