import { connect } from 'react-redux';

import {
  fetchTownshipList,
} from '../../../redux/township/townshipAction';

import {
  setAppBarTitle,
  setScrollPosition,
} from '../../../redux/ui/uiAction';

import config from '../../../config';

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CityIcon from '@material-ui/icons/LocationCity';
import AddIcon from '@material-ui/icons/Add';

import Screen from '../../common/Screen';
import ScreenHeader from '../../common/ScreenHeader';
import ScreenContent from '../../common/ScreenContent';
import Footer from '../../common/Footer';

import BottomFab from '../../common/BottomFab';

const styles = {
  medianIcon: {
    fontSize: 32,
    marginRight: 0,
  },
};

class TownshipList extends React.Component {

  componentDidMount() {
    this.props.setAppBarTitle('Townships');
    this.props.fetchTownshipList();
  }

  onAdd = e => {
    this.props.history.push('/newTownship');
  }

  onListItemClick = _id => {
    setTimeout(() => this.props.history.push(`/townships/${_id}`), config.ON_CLICK_DELAY);
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

    const townshipList = this.props.townshipList.map(township => {
      return (
        <ListItem
          button 
          key={township._id} 
          onClick={() => this.onListItemClick(township._id)}
        >
          <ListItemIcon className={classes.medianIcon}>
            <CityIcon/>
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{className: 'myanmar3'}} primary={township.name}/>
        </ListItem>
      );
    });

    return (
      <Screen setTopNav>
        <ScreenHeader buttons={this.headerButtons}/>
        <ScreenContent screenId='TownshipList'>
          <Grid container justify='center'>  
            <Grid item xs={12} sm={10} lg={8}>
              <List>
                { townshipList }
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

const TownshipListWithStyles = withStyles(styles)(TownshipList);

export { TownshipListWithStyles as TownshipList };

const mapStateToProps = state => {
  return {
    townshipList: state.township.townshipList,
    scroll: state.ui.scroll,
  };
};

export default connect(
  mapStateToProps,
  { 
    fetchTownshipList,
    setAppBarTitle,
    setScrollPosition,
  }
)(TownshipListWithStyles);