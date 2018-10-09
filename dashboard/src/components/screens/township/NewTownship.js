import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';

import {
  createTownship,
} from '../../../redux/township/townshipAction';

import {
  setAppBarTitle,
} from '../../../redux/ui/uiAction';

import Button from '@material-ui/core/Button';

import { withStyles } from "@material-ui/core/styles";

import Screen from '../../common/Screen';
import ScreenContent from '../../common/ScreenContent';
import Footer from '../../common/Footer';

import FormScreen from '../../common/FormScreen';
import Form from "../../common/Form";

import {
  Name,
  Code,
} from './formItems';

const styles = {};

class NewTownship extends Component {
 
  state = {
    township: {},
  };

  componentDidMount() {
    this.props.setAppBarTitle('New Township');
  }

  onCancel = () => {
    this.props.history.goBack();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.createTownship(this.state.township);
  }

  onChange = e => {
    let township = {...this.state.township};
    township[e.target.id] = e.target.value;
    this.setState({
      township: township,
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

          <FormScreen title='New Township' onCancel={this.onCancel} >
            <Form
              disabled={this.props.inProgress}
              inProgress={this.props.inProgress}
              submitLabel="Create"
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

const NewTownshipWithStyles =  withStyles(styles)(withRouter(NewTownship));

export { NewTownshipWithStyles as NewTownship };

const mapStateToProps = state => {
  return {
    inProgress: state.township.uploadInProgress,
  };
};

export default connect(
  mapStateToProps,
  { 
    createTownship,
    setAppBarTitle,
  }
)(NewTownshipWithStyles);