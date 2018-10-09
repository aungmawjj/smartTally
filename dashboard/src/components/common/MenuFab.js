import { connect } from 'react-redux';


import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import classNames from 'classnames';

// import theme from '../theme';

const styles = theme => ({
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 3,
    left: theme.spacing.unit * 3,
    zIndex: 500,
  },
});

class MenuFab extends React.Component {

  render() {

    const classes = this.props.classes;
    const fabClassName = classNames(classes.fab);

    return (true) && (
      <Button onClick={this.props.onClick} variant="fab" mini className={fabClassName} color='primary'>
        <MenuIcon/>
      </Button>
    );
  }
}

const MenuFabWithStyles = withStyles(styles)(MenuFab);

const mapStateToProps = state => {
  return {
    viewWidth: state.ui.viewWidth,
  };
};

export default connect(
  mapStateToProps,
)(MenuFabWithStyles);