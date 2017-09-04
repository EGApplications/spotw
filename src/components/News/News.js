//@flow
import React, {Component} from 'react'
import './News.css'
import moment from 'moment'
import {  Item, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';

const renderItem = ({src,title,description,tags,startTime,endTime})=>(
    <Item>
        <Item.Image  src={src} />
        <Item.Content>
            <Item.Header as='a'>{title}</Item.Header>
            <Item.Meta>
                <span className='cinema'>{`${moment(startTime).format("DD.MM HH:mm")}`}</span>
            </Item.Meta>
            <Item.Description>
                {description}
            </Item.Description>
            <Item.Extra>
                {tags.map(tag=><Label>{tag}</Label>)}
            </Item.Extra>
        </Item.Content>
    </Item>
)

class News extends Component {
    render() {
        const { events } = this.props;
        console.log(events);
        return (
            <Item.Group divided className="news">
                {events.map(renderItem)}
            </Item.Group>)
    }
}

const mapState = state =>({
    events: state.request.events
});

export default connect( mapState, ()=>{} )( News )

