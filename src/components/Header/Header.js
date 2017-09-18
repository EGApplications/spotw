//@flow
import React, {Component} from 'react'
import {Input, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';
import Authorize from '../Authorize'
import User from '../User'
import './Header.css'

class Header extends Component{
    render(){
        const {user} = this.props;
        console.log(this.props);
        return (
            <Menu size="small" className="header-container">
                <Menu.Item>
                    <Input className='icon' icon='search' placeholder='Search...'/>
                </Menu.Item>

                <Menu.Item position="right">
                    {user ? <User username={user.username}/> : <Authorize/>}
                </Menu.Item>
            </Menu>
        )
    }
}

export default connect( ({request:{user}})=>({user}), ()=>({}) )( Header )
