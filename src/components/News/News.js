//@flow
import React, {Component} from 'react'
import {  Item, Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions'
import './News.css'
import NewsItem from '../dumb/NewsItem'
import _ from 'lodash'

class News extends Component{

    hoverEffect = id=>{
        const jumpingElements = document.getElementsByClassName( 'jumpEffect' );
        _.forEach( jumpingElements, elem=>elem.classList.remove( 'jumpEffect' ) );
        const relatedMarker = document.getElementsByClassName( id )[0];
        if ( relatedMarker ) relatedMarker.classList.add( 'jumpEffect' )
    }

    tabs = [
        { menuItem: 'Все', render: () =>{
            const { events } = this.props;
            return(<Tab.Pane attached={false}>
                <Item.Group divided  relaxed={true} className="news">
                    {events.map(item=><NewsItem {...{
                        key:item.id,
                        item,
                        hover:this.hoverEffect,
                        tagClick:this.props.actions.tagClick,
                        itemClick:this.props.actions.newsClick,
                        likeClick:this.props.actions.likeClick,
                    }}/>)}
                </Item.Group>
            </Tab.Pane>)
        }  },
        { menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
    ]

    render=()=> <Tab menu={{ secondary: true, pointing: true }} panes={this.tabs} className="tabs" />

}

const mapState = ({ request: { events } }) =>({
    events
});

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect( mapState, mapActions )( News )

