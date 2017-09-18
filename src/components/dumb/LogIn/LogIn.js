//@flow
import React, { Component } from 'react';
import { Button, Form} from 'semantic-ui-react';

export default class SignIn extends Component{

    state={ username:'', password:'' };

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        this.props.onSubmit({...this.state});
    }

    render(){
        const {username, password} = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input label='username' placeholder='username' name="username" value={username}
                            onChange={this.handleChange} required/>
                <Form.Input label='password' placeholder='password' name="password" value={password}
                            onChange={this.handleChange} required/>
                <Button fluid type='submit'>Войти</Button>
            </Form>

        )
    }
}

