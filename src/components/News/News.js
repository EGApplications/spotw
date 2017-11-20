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
    tabChange = (event, data)=>{
        debugger;
    }

    tabs = [
        { menuItem: 'Все', render: () =>{
            const {actions, user, events}= this.props;
            return (
                <Tab.Pane attached={false} className="newsAllTab" onTabChange={()=>console.log('ok')} onChange={()=>console.log('ok')}>
                    <NewsItems {...{
                        items:events,
                        hover:this.hoverEffect,
                        tagClick:actions.tagClick,
                        itemClick:actions.newsClick,
                        watchClick:user && actions.watchClick,
                        memberClick:user && actions.memberClick,
                    }}/>
                </Tab.Pane>
            )
        }

        },
        { menuItem: 'Рекомендации', render: () => <Tab.Pane className="newsAllTab" attached={false}>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Подписки', render: () => <Tab.Pane className="newsAllTab" attached={false}>Tab 3 Content</Tab.Pane> },
    ]


    render=()=> <Tab menu={{ secondary: true }} panes={this.tabs} className="tabs" />

}

const mapState = ({ request: { events }, auth:{user} }) =>({
    events, user
});

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect( mapState, mapActions )( News )

