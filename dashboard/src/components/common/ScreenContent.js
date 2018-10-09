import { connect } from 'react-redux';

import {
  setScrollPosition,
} from '../../redux/ui/uiAction';

import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import theme from '../theme';

const styles = {
  screen: {
    position: 'relative',
    overflow: 'auto',
    overflowX: 'hidden',
    // overflowScrolling: "touch",
    WebkitOverflowScrolling: "touch",
  },

  full: {
    height: `100%`,
  },

  clipped: {
    height: `calc(100% - 56px)`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(100% - 48px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - 64px)`,
    },
  }
};

class ScreenContent extends React.Component {

  scrollPosition = 0;

  componentDidMount() {
    this.updateScroll();
  };

  updateScroll = () => {
    if(!this.props.screenId) return;
    const layoutElement = document.getElementById('layout');
    layoutElement.scrollTop = this.props.scroll[this.props.screenId];
  }

  componentWillUnmount() {
    const scroll = {};
    scroll[this.props.screenId] = this.scrollPosition;
    this.props.setScrollPosition(scroll);
  }

  onScroll = e => {
    this.scrollPosition = e.target.scrollTop;
  }

  render() {
    const classes = this.props.classes;

    const modifier = this.props.screenHeaderOpen ? classes.clipped : classes.full;
    
    return (
      <div id='layout' onScroll={this.onScroll} className={classNames(classes.screen, modifier)}>
        {this.props.children}
      </div>
    );
  }
}

const ScreenContentWithStyles = withStyles(styles)(ScreenContent);

const mapStateToProps = state => {
  return {
    screenHeaderOpen: state.ui.screenHeaderOpen,
    scroll: state.ui.scroll,
  };
};

export default connect(
  mapStateToProps,
  { setScrollPosition }
)(ScreenContentWithStyles);