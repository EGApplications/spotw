//@flow
import React, { Component } from 'react';
import { Header, Modal,  Tab, Button, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../core/actions'
import './Authorize.css';
import LogIn from '../dumb/LogIn'
import SignIn from '../dumb/SignIn'
import ForgotPassword from '../dumb/ForgotPassword'
import SocialEnter from '../dumb/SocialEnter'
import config from '../../../config'

class Authorize extends Component{

    componentDidMount(){
        //vk authorization
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        if (hashParams.has('access_token')){
            const params = {};
            hashParams.forEach((value,key)=>params[key]=value);
            this.props.loginWithVk(params);
        }
    }

    panes = [
        { menuItem:'Войти', render:()=> <Tab.Pane>
            <LogIn onSubmit={this.props.loginLocal}/>
            <ForgotPassword resetPassword={this.props.resetPassword}/>
        </Tab.Pane>},
        { menuItem:'Зарегестрироваться', render:()=> <Tab.Pane>
            <SignIn onSubmit={this.props.signinLocal}/>
        </Tab.Pane>}
    ]

    redirectToVk=()=>window.location.replace( `https://oauth.vk.com/authorize?client_id=${config.vk.client_id}&display=page&redirect_uri=${config.vk.redirect_uri}&scope=${config.vk.scope}&response_type=token&v=${config.vk.v}`);

    render(){
        const { msg, loginWithFb, loginWithFbErr } = this.props;
        return (
            <Modal trigger={<Button compact><Icon name="sign in" size="large"/>Sign-in</Button>} size="tiny" dimmer="blurring">
                <Modal.Content>
                    <Modal.Description>
                        {msg && <Message color={msg.color} content={msg.text}/>}
                        <Tab panes={this.panes}/>
                        <Header size="small" textAlign='center'>Быстрый вход</Header>
                        <SocialEnter
                            loginWithFb={loginWithFb}
                            loginWithFbErr={loginWithFbErr}
                            redirectToVk={this.redirectToVk}
                        />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}


//const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

const mapProps = ({ui:{editorOpen},auth:{msg}, map:{lastClick:{latlng}}, request:{saveEventPending}}) => ({
    isOpen:editorOpen,
    location:latlng,
    isEventUploading:saveEventPending,
    msg
});

export default connect( mapProps, actions )( Authorize )

