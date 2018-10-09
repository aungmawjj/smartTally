import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from "@material-ui/core/styles";

import theme from '../theme';

const styles = {
  header: {
    paddingTop: 24,
    paddingBottom: 12,
  },
  content: {
    paddingTop: 0,
  },
};

class FormScreen extends Component {

  render() {
    const classes = this.props.classes;
    const smallScreen = this.props.viewWidth < theme.breakpoints.values.sm;
    const elevation = smallScreen ? 0 : 2;

    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={this.props.sm || 8} md={this.props.md || 6} lg={this.props.lg || 4}>
          
          { !smallScreen && <div style={{height: 32}}></div>}

          <Card elevation={elevation}>
            <CardHeader
              titleTypographyProps={{color: 'primary'}}
              className={classes.header}
              title={this.props.title}
              action={ this.props.onCancel && (
                <IconButton
                  onClick={this.props.onCancel}
                  color="default"
                >
                  <CloseIcon/>
                </IconButton>
              ) }
            />
            <CardContent className={classes.content}>
              {this.props.children}
            </CardContent>
          </Card>
          
        </Grid>
      </Grid>
    );
  }
}

const FormScreenWithStyles =  withStyles(styles)(withRouter(FormScreen));

export { FormScreenWithStyles as FormScreen };

const mapStateToProps = state => {
  return {
    viewWidth: state.ui.viewWidth
  };
};

export default connect(
  mapStateToProps
)(FormScreenWithStyles);