import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

export default ({resetPassword})=>(
            <Modal trigger={<p>Forgot your password?</p>} dimmer="blurring" size="tiny" closeIcon>
                <Modal.Header>Forgot password?</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={({target:{email:{value}}})=>resetPassword(value)}>
                        <Form.Input label='email' placeholder='email' type="email" autoComplete="email" name="email" required/>
                        <Button type='submit'>Reset password</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )


