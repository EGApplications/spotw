 //@flow
import React, {Component} from 'react'
import {  Item, Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions'
import './News.css'
import NewsItems from '../dumb/NewsItems'
import _ from 'lodash'

class News extends Component{

    hoverEffect = id=>{
        const jumpingElements = document.getElementsByClassName( 'jumpEffect' );
        _.forEach( jumpingElements, elem=>elem.classList.remove( 'jumpEffect' ) );
        const relatedMarker = document.getElementsByClassName( id )[0];
        if ( relatedMarker ) relatedMarker.classList.add( 'jumpEffect' )
    }

    tabs = [
        { menuItem: 'Все', render: () =>
                <Tab.Pane attached={false}>
                    <NewsItems {...{
                        items:this.props.events,
                        hover:this.hoverEffect,
                        tagClick:this.props.actions.tagClick,
                        itemClick:this.props.actions.newsClick,
                        watchClick:this.props.actions.watchClick,
                        memberClick:this.props.actions.memberClick,
                    }}/>
                </Tab.Pane>
        },
        { menuItem: 'Рекомендации', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Подписки', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
    ]


    render=()=> <Tab menu={{ secondary: true }} panes={this.tabs} className="tabs" />

}

const mapState = ({ request: { events } }) =>({
    events
});

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect( mapState, mapActions )( News )

