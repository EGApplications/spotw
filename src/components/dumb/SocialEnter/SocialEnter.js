//@flow
import React from 'react';
import {Icon, Button, List} from 'semantic-ui-react';

export default ({loginWithFb, redirectToVk })=>(
    <List relaxed>
        <List.Item>
            <Button fluid size="large" color='facebook' onClick={loginWithFb}>
                <Icon name='facebook'/> Facebook
            </Button>
        </List.Item>
        <List.Item>
            <Button fluid size="large" color='vk' onClick={redirectToVk} >
                <Icon name='vk'/> VK
            </Button>
        </List.Item>
    </List>
)

