//@flow
import React, {Component} from 'react'
import './News.css'
import moment from 'moment'
import {  Item, Label, Button, Icon, Rating} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions'



class News extends Component {

    locationClick = (coords)=>{
        this.props.actions.setMapView({center:coords, zoom:14})
    }

    renderItem = ({src,title,description,tags,startTime,endTime,coords})=>
        <Item>
            <Item.Image  src={src} />
            <Item.Content>
                <Item.Header>
                    <span>{title}</span>
                    <Button compact circular icon onClick={this.locationClick.bind(this,coords)}><Icon name='location arrow' /></Button>
                </Item.Header>
                <Item.Meta>
                    <span className='cinema'>{`${moment(startTime).format("DD.MM HH:mm")}`}</span>
                </Item.Meta>
                <Item.Description>
                    {description}
                </Item.Description>
                <Item.Extra>
                    {tags.map(tag=><Label size="small">{tag}</Label>)}
                </Item.Extra>
                <Item.Extra className="extra-like">
                    <Rating icon='heart' className="like" size="huge" defaultRating={0} maxRating={1} />
                </Item.Extra>

            </Item.Content>
        </Item>


    render() {
        const { events } = this.props;
        console.log(events);
        return (
            <Item.Group divided className="news">
                {events.map(this.renderItem)}
            </Item.Group>)
    }
}

const mapState = state =>({
    events: state.request.events
});

const mapActions = dispatch =>({
    actions:{
        ...bindActionCreators(actions, dispatch),
    }
})

export default connect( mapState, mapActions )( News )

