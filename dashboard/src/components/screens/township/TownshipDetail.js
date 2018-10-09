import { connect } from 'react-redux';

import {
  setCurrentTownshipId,
  fetchTownshipById,
  deleteTownship,
} from '../../../redux/township/townshipAction';

import {
  setAppBarTitle,
} from '../../../redux/ui/uiAction';

import React from 'react';

import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles } from '@material-ui/core/styles';

import Screen from '../../common/Screen';
import ScreenHeader from '../../common/ScreenHeader';
import ScreenContent from '../../common/ScreenContent';
import Footer from '../../common/Footer';

import DetailItem from '../../common/DetailItem';
import theme from '../../theme';

const styles = {};

class TownshipDetail extends React.Component {

  componentDidMount() {
    this.props.setAppBarTitle('Township Detail');
    this.props.setCurrentTownshipId(this.props.match.params._id);
    this.props.fetchTownshipById(this.props.match.params._id);
  }

  onEdit = () => {
    this.props.history.push(`/townships/${this.props.township._id}/edit`);
  }

  onDelete = () => {
    if(window.confirm(`Are you sure delete Township: ${this.props.township.name} ?`)){
      this.props.deleteTownship(this.props.township._id);
    }
  }

  onBack = () => {
    this.props.history.goBack();
  }

  headerButtons = [
    {
      icon: (<DeleteIcon/>),
      label: 'delete',
      onClick: this.onDelete,
    },
    {
      icon: (<EditIcon/>),
      label: 'edit',
      onClick: this.onEdit,
    }
  ]

  render() {

    return this.props.township && (
      <Screen setScreenHeader>
        <ScreenHeader onBack={this.onBack} buttons={this.headerButtons}/>
        <ScreenContent>

          { (this.props.viewWidth > theme.breakpoints.values.sm) && <div style={{height: 32}}/>}

          <Grid container justify='center'>  
            <Grid item xs={12} sm={10} lg={8}>

              <CardHeader
                title={this.props.township.name}
                titleTypographyProps={{className: 'myanmar3'}}
              />

              <CardContent>
                <DetailItem label='code' value={this.props.township.code}/>
              </CardContent>

            </Grid>
          </Grid>

          <Footer/>
        </ScreenContent>
      </Screen>
    );
  }
}

const TownshipDetailWithStyles = withStyles(styles)(TownshipDetail);

export { TownshipDetailWithStyles as TownshipDetail };

const mapStateToProps = state => {
  return {
    township: state.township.townshipList.find(t => t._id === state.township.currentTownshipId) || null,
    viewWidth: state.ui.viewWidth,
  };
};

export default connect(
  mapStateToProps,
  {
    setCurrentTownshipId,
    fetchTownshipById,
    setAppBarTitle,
    deleteTownship,
  }
)(TownshipDetailWithStyles);