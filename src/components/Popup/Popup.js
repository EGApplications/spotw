import React, {Component} from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

export default class Popup extends Component{
    render(){
        const {src, children} = this.props;
        return (
            <Modal trigger={children}>
                <Modal.Header>Profile Picture</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={src}/>
                    <Modal.Description>
                        <Header>Modal Header</Header>
                        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
                        <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary>
                        Proceed <Icon name='right chevron'/>
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

