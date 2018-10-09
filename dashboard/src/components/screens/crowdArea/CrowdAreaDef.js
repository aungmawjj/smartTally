import { connect } from 'react-redux';

import React from 'react';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

import List from './List';
import Map from './Map';

import theme from '../../theme';

import Screen from '../../common/Screen';

const styles = theme => ({
  fullHeight: {
    height: '100%',
  }
});


class CrowdAreaDef extends React.Component {

  render() {
    const classes = this.props.classes;

    const largeScreen = this.props.viewWidth > theme.breakpoints.values.sm;

    return (
      <Screen>
        <Grid container className={classes.fullHeight}>
          { largeScreen && (
            <Grid item md={8} lg={9} className={classes.fullHeight}>
              <Map crowdAreaList={this.props.crowdAreaList}/>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={4} lg={3} className={classes.fullHeight}>
            <List crowdAreaList={this.props.crowdAreaList}/>
          </Grid>
        </Grid>
      </Screen>
    );
  }
}

const CrowdAreaDefWithStyles = withStyles(styles)(CrowdAreaDef);

export { CrowdAreaDefWithStyles as CrowdAreaDef };

const mapStateToProps = state => {
  return {
    crowdAreaList: state.crowdArea.crowdAreaList,
    viewWidth: state.ui.viewWidth,
    scroll: state.ui.scroll,
  };
};

export default connect(
  mapStateToProps,
  null
)(CrowdAreaDefWithStyles);