import { Map, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import { Card, Icon, Image } from 'semantic-ui-react'
import React, {Component} from 'react';
import Leaflet from 'leaflet'
import Popup from '../Popup'
import _ from 'lodash'
import './Map.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';


export default class MapLeaf extends Component {

    //if the same props, no render (functions can't be compare)
    shouldComponentUpdate = prevProps => !_.isEqual(_.omitBy(prevProps, _.isFunction),_.omitBy(this.props, _.isFunction));
    
    renderTooltip = marker =>{
        const {src, title, description, user, members=[], subscribers=[], displayTime} = marker;
        return(
            <Card>
                { src && <Image src={src} alt={title} label={{
                    color: 'blue',
                    icon: 'time',
                    ribbon: true,
                    content: `${displayTime}`
                }}/> }
                <Card.Content>
                    <Card.Header content={title} />
                    <Card.Meta>{<span>{user.displayName}</span>}</Card.Meta>
                    <Card.Description content={description} />
                </Card.Content>
                <Card.Content extra>
                        <Icon name='user' />
                        {members.length}
                        <span>&nbsp;</span>
                        <Icon name='eye' />
                        {subscribers.length}
                </Card.Content>
            </Card>
        )
    }

    renderMarker = marker =>(
            <Popup key={marker.id} {...marker} trigger={
                <Marker position={marker.coords} icon={Leaflet.icon({
                    iconUrl: 'img/marker-icon.png',
                    iconSize: [25, 41],
                    className: marker.id
                })
                }>
                    <Tooltip direction="top" opacity="1">{this.renderTooltip(marker)}</Tooltip>
                </Marker>
            }/>
        )

    onViewportChanged = viewport=>{
        this.props.onViewportChanged( {
            ...viewport,
            // bounds:this.refs.map.leafletElement.getBounds()
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
                inertiaDeceleration={4500}
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












