import { connect } from 'react-redux';
import {
  toggleNavDrawer,
} from '../../redux/ui/uiAction';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Hidden from '@material-ui/core/Hidden';

import DrawerContent from './DrawerContent';

const styles = theme => ({

  permanentDrawerPaper: {
    position: 'relative',
    width: 300,
  },

  permanentDrawerContent: {
    width: 300,
  },

  drawerContent: {
    width: 250,
  },

  fullList: {
    width: 'auto',
  },
});

class NavDrawer extends React.Component {

  render() {
    const { classes } = this.props;
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
      <div>
        <Hidden mdUp>
          <SwipeableDrawer 
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={this.props.navDrawerOpen}
            onOpen={() => this.props.toggleNavDrawer(true)}
            onClose={() => this.props.toggleNavDrawer(false)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={() => this.props.toggleNavDrawer(false)}
              onKeyDown={() => this.props.toggleNavDrawer(false)}
            >
              <div className={classes.drawerContent}>
                <DrawerContent/>
              </div>
            </div>
          </SwipeableDrawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            classes={{paper: classes.permanentDrawerPaper}}
            variant='permanent'
          >
            <DrawerContent/>
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const NavDrawerWithStyles = withStyles(styles)(NavDrawer);

export { NavDrawerWithStyles as NavDrawer };

const mapStateToProps = state => {
  return {
    navDrawerOpen: state.ui.navDrawerOpen
  };
};

export default connect(
  mapStateToProps,
  { toggleNavDrawer }
)(NavDrawerWithStyles);
