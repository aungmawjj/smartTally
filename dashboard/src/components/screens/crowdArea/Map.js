
import React from 'react';
import ReactDOMServer from 'react-dom/server';


import config from '../../../config';
import L from 'leaflet';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  crowdAreaMap: {
    height: '100%',
    width: '100%',
  },
  tooltip: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    border: '0px solid #fff',
    padding: 0
  },
  tooltipName: {
    padding: theme.spacing.unit,
    display: 'inline-block',
    background: theme.palette.primary.main,
  },
  tooltipPop: {
    padding: theme.spacing.unit,
    display: 'inline-block',
    background: '#000',
  }

});

const markerOptions = {
  fillColor: '#000',
  fillOpacity: 1,
  radius: 8,
  weight: 0,
};

class Tooltip extends React.Component {
  render() {
    const classes = this.props.classes;
    const crowdArea = this.props.crowdArea;
    return (
      <div>
        <span className={ classes.tooltipName }>
          {crowdArea.name}
        </span>
        <span className={ classes.tooltipPop }>
          {crowdArea.population || 0}
        </span>
      </div>
    );
  }
}

class Marker {


  constructor(map, crowdArea, classes) {
    
    const tooltipOptions = {
      permanent: true,
      opacity: 1,
      direction: 'top',
      className: classes.tooltip,
      offset: L.point(0, -10)
    };

    const latLng = [crowdArea.position.latitude, crowdArea.position.longitude];

    this.marker = L.circleMarker(latLng, markerOptions)
      .addTo(map)
      .bindTooltip(
        ReactDOMServer.renderToString(
          <Tooltip crowdArea={crowdArea} classes={classes}/>
        ), tooltipOptions)
      .openTooltip();
    this.map = map;
  }

  delete() {
    this.map.removeLayer(this.marker);
  }
}


class CrowdAreaList extends React.Component {
  constructor() {
    super();
    this.markers = {};
  }

  addDestinationMarker(map, destination) {
    L.marker(destination.position).addTo(map);
  }

  componentDidMount() {
    this.mapOptions = {
      center: config.map.center,
      zoom: config.map.zoom,
      zoomControl: false,
      tap: false
    };

    this.map = L.map('map', this.mapOptions);
    L.tileLayer(config.map.url).addTo(this.map);
    this.updateMarkers(this.map, this.props.crowdAreaList);
  }

  componentDidUpdate(prevProps) {
    if(this.props.crowdAreaList === prevProps.crowdAreaList) return;
    if(this.map) {
      this.updateMarkers(this.map, this.props.crowdAreaList);
    }
  }

  updateMarkers(map, crowdAreas) {

    for(let i = 0; i < this.markers.length; i++) {
      this.markers[i].delete();
    }

    this.markers = [];

    crowdAreas.forEach(c => {
      this.markers.push(new Marker(map, c, this.props.classes));
    });

  };

  render() {

    const classes = this.props.classes;

    return (
      <div id='map' className={ classes.crowdAreaMap }>
      </div>
    );
  }
}

export default withStyles(styles)(CrowdAreaList);
