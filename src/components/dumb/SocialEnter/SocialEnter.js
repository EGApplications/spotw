//@flow
import React, {Component} from 'react';
import {Icon, Button, List} from 'semantic-ui-react';


export default class SocialEnter extends Component {

    render() {
        const {loginWith} = this.props;
        return (
            <List relaxed>
                <List.Item>
                    <Button fluid size="large" color='facebook' onClick={()=>{loginWith('FB')}}>
                        <Icon name='facebook'/> Facebook
                    </Button>
                </List.Item>
                <List.Item>
                    <Button fluid size="large" color='google plus' onClick={()=>{loginWith('GP')}}>
                        <Icon name='google plus'/> Google Plus
                    </Button>
                </List.Item>
                <List.Item>
                    <Button fluid size="large" color='vk' onClick={()=>{loginWith('VK')}}>
                        <Icon name='vk'/> VK
                    </Button>
                </List.Item>
            </List>

        )
    }
}

