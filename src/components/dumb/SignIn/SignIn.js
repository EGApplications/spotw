//@flow
import React, { Component } from 'react';
import {  Button, Checkbox, Form } from 'semantic-ui-react';

export default class SignIn extends Component{

    state={username:'',email:'',password:''};

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        this.props.onSubmit({...this.state});
    }

    render() {
        const {username, password, email} = this.state;
        return (
            <div>

            <Form onSubmit={this.handleSubmit}>
                <Form.Input label='username' placeholder='username' type="text" autoComplete="username" name="username" value={username}
                            onChange={this.handleChange} required/>
                <Form.Input label='password' placeholder='password' name="password" type="password" autoComplete="password" value={password}
                            onChange={this.handleChange} required/>
                <Form.Input label='email' placeholder='email' type="email" name="email" autoComplete="email" value={email} onChange={this.handleChange}
                            required/>
                <Form.Field required>
                    <Checkbox label='I agree to the Terms and Conditions'/>
                </Form.Field>
                <Button fluid type='submit'>Зарегистрироваться</Button>
            </Form>
            </div>

        )
    }
}

