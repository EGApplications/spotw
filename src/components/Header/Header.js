//@flow
import React from 'react'
import {Input, Menu, Button, Sticky} from 'semantic-ui-react'

export default () => (
    <Sticky offset="1">
        <Menu size="small" >
            <Menu.Item>
                <Input className='icon' icon='search' placeholder='Search...'/>
            </Menu.Item>

            <Menu.Item position="right">
                <Button attached='left' primary>Sign up</Button>
                <Button attached='right'>Log-in</Button>
            </Menu.Item>
        </Menu>
    </Sticky>
)