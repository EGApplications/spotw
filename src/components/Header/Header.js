//@flow
import React from 'react'
import {Input, Menu, Button, Icon } from 'semantic-ui-react'
import Login from '../Login'
import './Header.css'

export default () => (
        <Menu size="small" className="header-container">
            <Menu.Item>
                <Input className='icon' icon='search' placeholder='Search...'/>
            </Menu.Item>

            <Menu.Item position="right">
                <Login trigger={
                    <Button compact><Icon name="sign in" size="large"/>Log-in</Button>
                }/>
            </Menu.Item>
        </Menu>
)