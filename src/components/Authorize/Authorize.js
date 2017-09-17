//@flow
import React, { Component } from 'react';
import { Header, Modal,  Tab, } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions'
import './Authorize.css';
import LogIn from '../dumb/LogIn'
import SignIn from '../dumb/SignIn'
import SocialEnter from '../dumb/SocialEnter'


class Authorize extends Component{
    panes = [
        { menuItem:'Зарегестрироваться', render:()=> <Tab.Pane>
            <SignIn onSubmit={this.props.actions.signinLocal} />
        </Tab.Pane>},
        { menuItem:'Войти', render:()=> <Tab.Pane>
            <LogIn onSubmit={this.props.actions.loginLocal} />
        </Tab.Pane>}
    ]

    render(){
        const { trigger } = this.props;
        return (
            <Modal trigger={trigger} size="tiny" dimmer="blurring">
                <Modal.Content>
                    <Modal.Description>
                        <Tab panes={this.panes}/>
                        <Header size="small" textAlign='center'>Быстрый вход</Header>
                        <SocialEnter/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}


const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

const mapProps = ({ui:{editorOpen}, map:{lastClick:{latlng}}, request:{saveEventPending}}) => ({
    isOpen:editorOpen,
    location:latlng,
    isEventUploading:saveEventPending
});

export default connect( mapProps, mapActions )( Authorize )

