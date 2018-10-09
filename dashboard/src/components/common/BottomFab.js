import { connect } from 'react-redux';


import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import classNames from 'classnames';

import theme from '../theme';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabMoveUp: {
    transform: 'translate3d(0, -56px, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  fabMoveDown: {
    transform: 'translate3d(0, 0, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
});

class BottomFab extends React.Component {

  render() {

    const open = this.props.snackbar.open;
    const classes = this.props.classes;
    const fabClassName = classNames(classes.fab, open ? classes.fabMoveUp : classes.fabMoveDown);

    return (this.props.viewWidth < theme.breakpoints.values.sm) && (
      <Button onClick={this.props.onClick} variant="fab" className={fabClassName} color='secondary'>
        {this.props.icon}
      </Button>
    );
  }
}

const BottomFabWithStyles = withStyles(styles)(BottomFab);

const mapStateToProps = state => {
  return {
    viewWidth: state.ui.viewWidth,
    snackbar: state.ui.snackbar,
  };
};

export default connect(
  mapStateToProps,
)(BottomFabWithStyles);