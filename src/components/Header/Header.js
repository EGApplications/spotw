//@flow
import React from 'react'
import {Input, Menu, Button } from 'semantic-ui-react'
import './Header.css'

export default () => (
        <Menu size="small" className="header-container">
            <Menu.Item>
                <Input className='icon' icon='search' placeholder='Search...'/>
            </Menu.Item>

            <Menu.Item position="right">
                <Button attached='left' primary>Sign up</Button>
                <Button attached='right'>Log-in</Button>
            </Menu.Item>
        </Menu>
)