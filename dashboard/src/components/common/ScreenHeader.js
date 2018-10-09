import { connect } from 'react-redux';

import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import ChevronLeft from '@material-ui/icons/ChevronLeft';

import theme from '../theme';

const styles = {
  screenHeader: {
    position: 'absolute',
    width: '100%',
    background: 'white',
    zIndex: 1,
    borderBottom: '0.5px solid #cccccc',
  },
  toolbar: theme.mixins.toolbar
};

const BackButton = props => {
  return props.small ? (
    <IconButton
      onClick={props.onBack}
      color="secondary"
      style={{marginLeft: -12}}
    >
      <ChevronLeft/>
    </IconButton>
  ) : (
    <Button
      onClick={props.onBack}
      color="secondary"
      variant="outlined"
    >
      <ChevronLeft/>
    </Button>
  );
};

const OptionButtons = props => {
  return props.small ? (
    props.buttons.map((button, i) => (
      <IconButton
        key={i}
        style={{
          marginRight: -12,
          marginLeft: 12,
        }}
        color="secondary"
        onClick={button.onClick}
      >
        {button.icon}
      </IconButton>
    ))
  ) : (
    props.buttons.map((button, i) => (
      <Button
        key={i}
        style={{
          marginLeft: 24,
        }}
        variant="outlined" 
        color="secondary"
        onClick={button.onClick}
      >
        {button.icon}
        <span 
          style={{
            marginLeft: theme.spacing.unit,
          }}
        >
          {button.label}
        </span>
      </Button>
    ))
  );
};

class ScreenHeader extends Component {

  render() {

    const classes = this.props.classes;

    const smallScreen = this.props.viewWidth < theme.breakpoints.values.md;

    return this.props.screenHeaderOpen && (
      <div>
        
        <Grid container justify='center' className={classes.screenHeader}>
          <Grid item xs={12} md={10} lg={8}>
            <Toolbar>

              { this.props.onBack && <BackButton small={smallScreen} onBack={this.props.onBack}/> }

              { (!this.props.topNavOpen && smallScreen) && (
                <Typography variant="title" color="secondary" noWrap>
                  { this.props.appBarTitle }
                </Typography>
              ) }

              { (this.props.title && this.props.topNavOpen) && (
                <Typography variant="title" color="secondary" noWrap>
                  { this.props.title }
                </Typography>
              ) }

              <div style={{flexGrow: 1}}></div>

              { this.props.buttons && <OptionButtons small={smallScreen} buttons={this.props.buttons}/> }

            </Toolbar>
          </Grid>
        </Grid>

        <div className={classes.toolbar}></div>

      </div>
    );

  }
}

const ScreenHeaderWithStyles = withStyles(styles)(ScreenHeader);

const mapStateToProps = state => {
  return {
    screenHeaderOpen: state.ui.screenHeaderOpen,
    topNavOpen: state.ui.topNavOpen,
    appBarTitle: state.ui.appBarTitle,
    viewWidth: state.ui.viewWidth,
  };
};

export default connect(
  mapStateToProps
)(ScreenHeaderWithStyles);