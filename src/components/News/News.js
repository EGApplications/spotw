//@flow
import React, {Component} from 'react'
import './News.css'
import {  Image as ImageComponent, Item, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';

const renderItem = ({src,header,meta,description,tags})=>(
    <Item>
        <Item.Image src={src} />
        <Item.Content>
            <Item.Header as='a'>{header}</Item.Header>
            <Item.Meta>
                <span className='cinema'>{meta}</span>
            </Item.Meta>
            <Item.Description>
                <ImageComponent src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
            </Item.Description>
            <Item.Extra>
                {tags.map(tag=><Label>{tag}</Label>)}
            </Item.Extra>
        </Item.Content>
    </Item>
)

class News extends Component {
    render() {
        const { events } = this.props.request;
        return (
            <Item.Group divided className="news">
                {events.map(renderItem)}
            </Item.Group>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect( state=>state, mapDispatchToProps )( News )

