import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  formControl: {
    paddingTop: 48,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    marginLeft: theme.spacing.unit * 3,
    position: 'relative',
  },
});


class Form extends Component {
  render() {
    const classes = this.props.classes;
    return(
      <form onSubmit={this.props.onSubmit}>
        {this.props.children}

        <Grid container justify="flex-end" className={classes.formControl}>
          {this.props.extraButtons}
          {this.props.submitLabel &&
            <div className={classes.wrapper}>
              <Button variant='contained' color="primary" type="submit" disabled={this.props.disabled}>
                {this.props.submitLabel}
              </Button>
              {this.props.inProgress && 
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                  color='primary'/>
              }
            </div>
          }
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(Form);