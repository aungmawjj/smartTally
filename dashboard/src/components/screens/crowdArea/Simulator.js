import { connect } from 'react-redux';

import {
  updateCrowdArea,
} from '../../../redux/crowdArea/crowdAreaAction';

import React from 'react';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import IconButton from '@material-ui/core/IconButton';

import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

import Screen from '../../common/Screen';

const styles = theme => ({

  main: {
    height: '100%',
    background: theme.palette.primary.main,
  },
  fullHeight: {
    height: '100%',
  },
  card: {
    marginTop: theme.spacing.unit * 10,
  },
  header: {
    padding: theme.spacing.unit * 3,
    color: '#fff',
    background: '#000',
  },
  population: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  popText: {
    flexGrow: 1,
  },
  incBtn: {
    color: 'green'
  },
  decBtn: {
    color: 'red'
  }
});
 
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '50vh',
    },
  },
};

class CrowdAreaDef extends React.Component {

  constructor() {
    super();
    this.state = {
      crowdAreaId: null,
    };
  }

  onCrowdAreaChange = e => {
    this.setState({crowdAreaId: e.target.value});
  }

  onIncClick = () => {
    const crowdArea = {...this.props.crowdAreaList.find(c => c._id === this.state.crowdAreaId)};
    if (!crowdArea) return;
    crowdArea.population += 1;
    this.props.updateCrowdArea(crowdArea);
  }

  onDecClick = () => {
    const crowdArea = {...this.props.crowdAreaList.find(c => c._id === this.state.crowdAreaId)};
    if (!crowdArea) return;
    if(crowdArea.population > 0) {
      crowdArea.population -= 1;
    }
    this.props.updateCrowdArea(crowdArea);
  }

  render() {
    const classes = this.props.classes;

    const crowdAreaSelectList = this.props.crowdAreaList.map(c => {
      return (
        <MenuItem key={c._id} value={c._id}>
          {c.name}
        </MenuItem>
      );
    });

    const crowdArea = this.props.crowdAreaList.find(c => c._id === this.state.crowdAreaId);

    return (
      <Screen>
        <Grid container justify='center' className={classes.main}>
          <Grid item sm={11} md={6} lg={4} className={classes.fullHeight}>
            <Card elevation={4} className={classes.card}>
              <div className={classes.header}>
                <Typography variant='display1' color='inherit' align='center'>
                  Smart Tally Simulator
                </Typography>
              </div>
              <CardContent>
                <FormControl
                  fullWidth
                  style={{
                    marginTop: 16,
                    marginBottom: 8,
                  }}
                >
                  <InputLabel htmlFor='crowdArea'>Select KFC Branch</InputLabel>
                  <Select
                    MenuProps={MenuProps}
                    fullWidth
                    id='crowdArea'
                    value={this.state.crowdAreaId || ''}
                    onChange={this.onCrowdAreaChange}
                  >
                    { crowdAreaSelectList }
                  </Select>
                </FormControl>

                <div className={classes.population}>
                  <div className={classes.popText}>
                    { crowdArea && crowdArea.population}
                  </div>

                  <IconButton className={classes.decBtn} onClick={this.onDecClick}>
                    <ArrowDownward/>
                  </IconButton>

                  <IconButton className={classes.incBtn} onClick={this.onIncClick}>
                    <ArrowUpward/>
                  </IconButton>

                </div>

              </CardContent>
              
            </Card>
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
  {updateCrowdArea}
)(CrowdAreaDefWithStyles);