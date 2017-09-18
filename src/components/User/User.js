
import React, {Component} from 'react'
import { Button, Header, Icon, Image, Modal, Label, Dropdown } from 'semantic-ui-react'

export default class User extends Component{
    render(){
        console.log(this.props);
        const src = 'https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg';
        const { username }= this.props;
        return (
            <Dropdown trigger={<Label color={"blue"}><Image avatar spaced='right' src={src}/>{username}</Label>} icon={null}>
                <Dropdown.Menu>
                    <Dropdown.Header icon='tags' content='Filter by tag'/>
                    <Dropdown.Divider/>
                    <Modal
                        trigger={<Dropdown.Item>Important</Dropdown.Item>}
                        dimmer="blurring"
                        closeIcon
                    >
                        <Modal.Header>Profile Picture</Modal.Header>
                        <Modal.Content image>
                            <Image wrapped size='medium'
                                   src={'https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg'}/>
                            <Modal.Description>
                                <Header>User window</Header>
                                <p>This is an example of expanded content that will cause the modal's dimmer to
                                    scroll</p>
                                <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button primary>
                                Proceed <Icon name='right chevron'/>
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <Dropdown.Item>Announcement</Dropdown.Item>
                    <Dropdown.Item>Discussion</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        )
    }
}

