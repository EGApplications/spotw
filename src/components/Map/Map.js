import { Map, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import { Card, Icon, Image } from 'semantic-ui-react'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Popup from '../Popup'
import './Map.css';

class MapLeaf extends Component {

    renderTooltip = ( {id,coords,src,title,description,startTime,endTime} )=>(
        <Card>
            {src && <Image src={src}/>}
            <Card.Content>
                <Card.Header>
                    {title}
                </Card.Header>
                <Card.Meta>
                <span className='date'>
                    {startTime}
                    {endTime}
                </span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a><Icon name='user'/>22 Friends</a>
            </Card.Content>
        </Card>
    )

    renderMarker = marker =>
        <Popup {...marker} trigger={
            <Marker key={marker.id} position={marker.coords}>
                <Tooltip direction="top">{this.renderTooltip(marker)}</Tooltip>
            </Marker>
        }/>


    render() {
        const {events, center, zoom} = this.props;
        return (
            <Map center={center}
                 zoom={zoom}
                 onViewportChanged={this.onViewportChanged}
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

const mapState = state =>({
        events: state.request.events,
        zoom: state.map.zoom,
        center: state.map.center
    })


export default connect(mapState,()=>{})(MapLeaf)







