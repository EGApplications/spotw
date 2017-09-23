//@flow
import React, { Component } from 'react';
import { Button, Form, Message, Icon} from 'semantic-ui-react';

export default class SignIn extends Component{

    state={ username:'', password:'' };

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        this.props.onSubmit({...this.state});
    }

    render(){
        const {username, password} = this.state;
        return (
            <div>
                <Message attached='top' error>
                    <Icon name='warning sign' />
                    here we can show error message
                </Message>
            <Form onSubmit={this.handleSubmit}>
                <Form.Input label='username' placeholder='username' type="text" autoComplete="username" name="username" value={username}
                            onChange={this.handleChange} required/>
                <Form.Input label='password' placeholder='password' type="password" autoComplete="password" name="password" value={password}
                            onChange={this.handleChange} required/>
                <Button fluid type='submit'>Войти</Button>
            </Form>

            </div>

        )
    }
}

