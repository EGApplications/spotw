//@flow
import React, { Component } from 'react';
import { Header, Icon, Button, Modal, Checkbox, Form, Tab, List } from 'semantic-ui-react';
import './Login.css';

export default class Login extends Component{
    render(){
        const { trigger } = this.props;
        return (
            <Modal trigger={trigger} size="tiny" dimmer="blurring">
                <Modal.Content>
                    <Modal.Description>
                        <Tab panes={[{
                            menuItem:'Зарегестрироваться', render:()=>
                                <Tab.Pane>
                                    <Form>
                                        <Form.Field>
                                            <input placeholder='name'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <input placeholder='email@gmail.com'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <input placeholder='password'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox label='I agree to the Terms and Conditions'/>
                                        </Form.Field>
                                        <Button fluid type='submit'>Зарегистрироваться</Button>
                                    </Form>
                                </Tab.Pane>
                        },
                            {
                                menuItem:'Войти', render:()=>
                                <Tab.Pane>
                                    <Form>
                                        <Form.Field>
                                            <input placeholder='email@gmail.com'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <input placeholder='password'/>
                                        </Form.Field>
                                        <Button fluid type='submit'>Войти</Button>
                                    </Form>
                                </Tab.Pane>
                            }
                        ]}/>
                        <Header size="small" textAlign='center'>Быстрый вход</Header>
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
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

