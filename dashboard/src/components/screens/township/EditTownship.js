import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';

import {
  setCurrentTownshipId,
  fetchTownshipById,
  updateTownship,
} from '../../../redux/township/townshipAction';

import {
  setAppBarTitle,
} from '../../../redux/ui/uiAction';

import Button from '@material-ui/core/Button';

import { withStyles } from "@material-ui/core/styles";

import Screen from '../../common/Screen';
import ScreenContent from '../../common/ScreenContent';
import Footer from '../../common/Footer';

import Form from "../../common/Form";
import FormScreen from '../../common/FormScreen';

import {
  Name,
  Code,
} from './formItems';

const styles = {};

class EditTownship extends Component {
 
  state = {
    township: {},
    unchanged: true,
  };

  componentDidMount() {
    this.props.setAppBarTitle('Edit Township');
    this.props.setCurrentTownshipId(this.props.match.params._id);
    this.updateTownshipState({});
  }

  componentDidUpdate(prevProps) {
    this.updateTownshipState(prevProps);
  }

  updateTownshipState = prevProps => {
    if (!this.props.township) return;
    if (this.props.township === prevProps.township) return;
    this.setState({
      township: {...this.props.township}
    });
  }

  onCancel = () => {
    this.props.history.goBack();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.updateTownship(this.state.township);
  }

  onChange = e => {
    let township = {...this.state.township};
    township[e.target.id] = e.target.value;
    this.setState({
      township: township,
      unchanged: false,
    });
  }

  render() {

    const extraButtons = (
      <div style={{flexGrow: 1, textAlign: 'right'}}>
        <Button
          onClick={this.onCancel}
          variant='outlined'
          style={{color: 'red'}}
          color='inherit'
        >
          Cancel
        </Button>
      </div>
    );

    return (
      
      <Screen noScreenHeader>
        <ScreenContent>

          <FormScreen title='Edit Township' onCancel={this.onCancel} >
            <Form
              disabled={this.props.inProgress || this.state.unchanged}
              inProgress={this.props.inProgress}
              submitLabel="Update"
              onSubmit={this.onSubmit}
              extraButtons={extraButtons}
            >

              <Name value={this.state.township.name} onChange={this.onChange}/>
              <Code value={this.state.township.code} onChange={this.onChange}/>

            </Form>
          </FormScreen>

          <Footer/>
        </ScreenContent>
      </Screen>
    );
  }
}

const EditTownshipWithStyles =  withStyles(styles)(withRouter(EditTownship));

export { EditTownshipWithStyles as EditTownship };

const mapStateToProps = state => {
  return {
    inProgress: state.township.uploadInProgress,
    township: state.township.townshipList.find(t => t._id === state.township.currentTownshipId) || null,
    currentPosition: state.gps.currentPosition,
  };
};

export default connect(
  mapStateToProps,
  { 
    setCurrentTownshipId,
    fetchTownshipById,
    updateTownship,
    setAppBarTitle,
  }
)(EditTownshipWithStyles);