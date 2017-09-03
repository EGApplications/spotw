import { Map, Marker, Popup, TileLayer } from 'react-leaflet/dist/react-leaflet.min';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import './Map.css';

class MapLeaf extends Component {

    mapClick = evt => {
        console.log(evt, 'map click');
    }

    onViewportChanged = viewport => {
        console.log('view port change');
    }

    markerClick=()=>{
        console.log('marker click');
    }

    renderMarker = ({id,coords})=>(
        <Marker key={id} position={coords} onClick={this.markerClick}>
            <Popup >
                <Card>
                    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                    <Card.Content>
                        <Card.Header>
                            Matthew
                        </Card.Header>
                        <Card.Meta>
        <span className='date'>
          Joined in 2015
        </span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            22 Friends
                        </a>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'>Approve</Button>
                            <Button basic color='red'>Decline</Button>
                        </div>
                    </Card.Content>
                </Card>
            </Popup>
        </Marker>
    )

    render() {
        const center = [50,30];
        const zoom =8;
        const {events} = this.props.request;
        console.log(events);
        return (

            <Map center={center}
                 zoom={zoom}
                 onViewportChanged={this.onViewportChanged}
                 onClick={this.mapClick}>
                <TileLayer
                    url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFmb2VkIiwiYSI6ImNqMHA2MHk5ODAwMDgzMnFxamQyNmVha3IifQ.8r9fW0pPDrNW7iwBqkVhhg'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={center}>
                    <Popup>
                        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                    </Popup>
                </Marker>
                {events.map(this.renderMarker)}
            </Map>

        )
    }
}
export default connect(state=>state,()=>{})(MapLeaf)







