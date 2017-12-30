 //@flow
import React, {Component} from 'react'
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
    tabChange = (event, {activeIndex, panes})=>this.props.actions.newsTabChange({name:panes[activeIndex].menuItem, activeIndex});

    renderTab = ()=>{
        const {actions, user, events}= this.props;
        return (
            <Tab.Pane attached={false} className="newsAllTab"  >
                <NewsItems {...{
                    items:events,
                    hover:this.hoverEffect,
                    tagClick:actions.tagClick,
                    itemClick:actions.newsClick,
                    subscribeClick:user && actions.subscribeClick,
                    memberClick:user && actions.memberClick,
                }}/>
            </Tab.Pane>
        )
    }

    tabs = [
        { menuItem: 'Все', render: this.renderTab},
        { menuItem: 'Рекомендации', render: this.renderTab },
        { menuItem: 'Подписки', render: this.renderTab },
    ]

    render=()=> <Tab menu={{ color:"blue",inverted: true, attached: false, tabular: false  }} panes={this.tabs}  className="tabs" activeIndex={this.props.activeIndex} onTabChange={this.tabChange}/>

}

const mapState = ({ request: { events }, auth:{user}, ui:{tabs:{activeIndex}} }) =>({
    events, user, activeIndex
});

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect( mapState, mapActions )( News )

