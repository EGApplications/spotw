import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions'
import Map from '../dumb/Map'


class MapWrap extends Component {

    onBoundsChanged(bounds){
        this.props.actions.boundsChanged( {bounds} );
    }

    mapClick = ({latlng,layerPoint}) => {
        console.log(arguments);
        this.props.actions.mapClick({latlng,layerPoint});
    }

    onViewportChanged=(viewport)=>this.props.actions.viewportChanged(viewport);

    render() {
        const { events, center, zoom, cursor } = this.props;
        return <Map
            events = {events}
            center = {center}
            cursor = {cursor}
            zoom = {zoom}
            onClick={this.mapClick}
            isUpdateRequired={true}
            onBoundsChanged={this.onBoundsChanged.bind(this)}
            onViewportChanged={this.onViewportChanged.bind(this)}
        />
    }
}

const mapState = ( { request:{ events }, map:{ center:{ latitude, longitude }, zoom, cursor } } )=>({
    cursor,
    events,
    zoom:zoom,
    center:[latitude, longitude]
})

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect(mapState, mapActions)(MapWrap)







