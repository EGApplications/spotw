//@flow
import React from 'react'
import {Input, Menu, Button, Icon } from 'semantic-ui-react'
import Authorize from '../Authorize'
import './Header.css'

export default () => (
        <Menu size="small" className="header-container">
            <Menu.Item>
                <Input className='icon' icon='search' placeholder='Search...'/>
            </Menu.Item>

            <Menu.Item position="right">
                <Authorize trigger={
                    <Button compact><Icon name="sign in" size="large"/>Sign-in</Button>
                }/>
            </Menu.Item>
        </Menu>
)