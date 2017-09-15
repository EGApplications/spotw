import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import './Footbar.css'
import * as actions from '../../core/actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Footbar extends Component {

    handleItemClick=()=>{
        this.props.actions.createMarkerClick();
    }

    render() {
        return (
            <Menu className="main" compact icon='labeled'>
                <Menu.Item name='add marker' onClick={this.handleItemClick}>
                    <Icon name='add circle' />
                    Games
                </Menu.Item>
            </Menu>
        )
    }
}

const mapState = ( ()=>({}) );

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect(mapState, mapActions)(Footbar)