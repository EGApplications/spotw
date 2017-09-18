//@flow
import React, {Component} from 'react';
import {Icon, Button, List} from 'semantic-ui-react';


export default class SocialEnter extends Component {

    render() {
        return (

            <List relaxed>
                <List.Item>
                    <Button fluid size="large" color='facebook'>
                        <Icon name='facebook'/> Facebook
                    </Button>
                </List.Item>
                <List.Item>
                    <Button fluid size="large" color='google plus'>
                        <Icon name='google plus'/> Google Plus
                    </Button>
                </List.Item>
                <List.Item>
                    <Button fluid size="large" color='vk'>
                        <Icon name='vk'/> VK
                    </Button>
                </List.Item>
            </List>

        )
    }
}

