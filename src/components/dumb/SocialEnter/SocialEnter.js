//@flow
import React, {Component} from 'react';
import {Icon, Button, List} from 'semantic-ui-react';
import FacebookProvider, {Login} from 'react-facebook'


export default class SocialEnter extends Component {



    render() {
        const {loginWithFb, loginWithVk, loginWithGp, loginWithFbErr} = this.props;
        return (
            <List relaxed>
                <List.Item>
                    <FacebookProvider appId="198503764011682">
                        <Login
                            scope="public_profile,email"
                            onResponse={loginWithFb}
                            onError={({message})=>loginWithFbErr(message) }
                        >
                            <Button fluid size="large" color='facebook'>
                                <Icon name='facebook'/> Facebook
                            </Button>
                        </Login>
                    </FacebookProvider>
                </List.Item>
                <List.Item>
                    <Button fluid size="large" color='google plus' >
                        <Icon name='google plus'/> Google Plus
                    </Button>
                </List.Item>
                <List.Item>
                    <Button fluid size="large" color='vk' >
                        <Icon name='vk'/> VK
                    </Button>
                </List.Item>
            </List>

        )
    }
}

