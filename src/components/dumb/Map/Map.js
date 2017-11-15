import { Map, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import { Card, Icon, Image } from 'semantic-ui-react'
import React, {Component} from 'react';
import Leaflet from 'leaflet'
import Popup from '../Popup'
import moment from 'moment'
import _ from 'lodash'
import './Map.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';


export default class MapLeaf extends Component {

    //if the same props, no render (functions can't be compare)
    shouldComponentUpdate = prevProps => !_.isEqual(_.omitBy(prevProps, _.isFunction),_.omitBy(this.props, _.isFunction));

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

    renderMarker = marker =>(
            <Popup key={marker.id} {...marker} trigger={
                <Marker position={marker.coords} icon={Leaflet.icon({
                    iconUrl: 'img/marker-icon.png',
                    iconSize: [25, 41],
                    className: marker.id
                })
                }>
                    <Tooltip direction="top">{this.renderTooltip(marker)}</Tooltip>
                </Marker>
            }/>
        )

    onViewportChanged = viewport=>{
        this.props.onViewportChanged( {
            ...viewport
            , bounds:this.refs.map.leafletElement.getBounds()
        } );
    }

    render() {
        console.log('rerender map');
        const { events, center, zoom, onClick, cursor } = this.props;
        return (
            <Map
                ref='map'
                style={{cursor:cursor}}
                zoom={zoom}
                center={center}
                onViewportChanged={this.onViewportChanged}
                onClick={onClick}>
                <TileLayer
                    url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFmb2VkIiwiYSI6ImNqMHA2MHk5ODAwMDgzMnFxamQyNmVha3IifQ.8r9fW0pPDrNW7iwBqkVhhg'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomControl position={"bottomright"}/>

                <MarkerClusterGroup>
                    { events.map( this.renderMarker )}
                </MarkerClusterGroup>
            </Map>
        )
    }
}












