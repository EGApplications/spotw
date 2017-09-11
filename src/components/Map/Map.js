import { Map, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import { Card, Icon, Image } from 'semantic-ui-react'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popup from '../Popup'
import moment from 'moment'
import './Map.css';
import * as actions from '../../core/actions'

class MapLeaf extends Component {

    componentDidUpdate(){
        //const bounds = this.refs.map.leafletElement.getBounds();
        //console.log(bounds);
    }


    renderTooltip = ( {id,coords,src,title,description,startTime,endTime} )=>(
        <Card>
            {src && <Image src={src}/>}
            <Card.Content>
                <Card.Header>
                    {title}
                </Card.Header>
                <Card.Meta>
                <span className='date'>
                    {`${moment(startTime).format("DD.MM HH:mm")} -
                    ${moment(endTime).format("DD.MM HH:mm")}`}
                </span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a><Icon name='user'/>22 Участника</a>
            </Card.Content>
        </Card>

    )

    renderMarker = marker =>
        <Popup key={marker.id} {...marker} trigger={
            <Marker  position={marker.coords}>
                <Tooltip direction="top">{this.renderTooltip(marker)}</Tooltip>
            </Marker>
        }/>

    onViewportChanged(coords) {
        const bounds = this.refs.map.leafletElement.getBounds();
        this.props.actions.getEvents({bounds});
    }

    render() {
        const {events, center, zoom} = this.props;
        return (
            <Map
                 ref='map'
                 zoom={zoom}
                 center={center}
                 onViewportChanged={this.onViewportChanged.bind(this)}
                 onClick={this.mapClick}>
                <TileLayer
                    url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFmb2VkIiwiYSI6ImNqMHA2MHk5ODAwMDgzMnFxamQyNmVha3IifQ.8r9fW0pPDrNW7iwBqkVhhg'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomControl position={"bottomright"}/>
                {events.map(this.renderMarker)}
            </Map>
        )
    }
}

const mapState = ( {
                       request:{ events },
                       map:{
                           center:{ latitude, longitude },
                           zoom
                       }
                   } )=>({
    events,
    zoom:zoom,
    center:[latitude, longitude]
})


function mapDispatchToProps(dispatch) {
    return {
        actions:{
            ...bindActionCreators(actions, dispatch),
        }
    }
}
export default connect(mapState, mapDispatchToProps)(MapLeaf)







