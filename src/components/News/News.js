//@flow
import React, {Component} from 'react'
import './News.css'
import moment from 'moment'
import {  Item, Label, Rating} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'lodash'
import * as actions from '../../core/actions'

class News extends Component {

    hover = (id) => {
        const jumpingElements = document.getElementsByClassName('jumpEffect');
        _.forEach(jumpingElements, elem=>elem.classList.remove('jumpEffect'));
        const relatedMarker = document.getElementsByClassName(id)[0];
        relatedMarker.classList.add('jumpEffect')
    }

    renderItem = ({id,src,title,description,tags,startTime,endTime,coords, user})=>
        <Item key={id} onMouseEnter={this.hover.bind(null, id)}  onMouseLeave={this.hover.bind(null, id)}>
            <Item.Image  src={src} />
            <Item.Content>
                <Item.Header>
                    <span>{title}</span>
                </Item.Header>
                <Item.Meta>
                    <span className='cinema'>{`${moment(startTime).format("DD.MM HH:mm")}`}</span>
                </Item.Meta>
                <Item.Description>
                    {description}
                </Item.Description>
                <Item.Extra>
                    {tags && tags.map((tag,i)=><Label key={i} size="small">{tag}</Label>)}
                </Item.Extra>
                <Item.Extra>
                    Created by {user && user.displayName}
                </Item.Extra>
                <Item.Extra className="extra-like">
                    <Rating icon='heart' className="like" size="huge" defaultRating={0} maxRating={1} />
                </Item.Extra>
            </Item.Content>
        </Item>


    render() {
        const { events } = this.props;
        return (
            <Item.Group divided className="news">
                {events.map(this.renderItem)}
            </Item.Group>)
    }
}

const mapState = ({ request: { events } }) =>({
    events
});

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect( mapState, mapActions )( News )

