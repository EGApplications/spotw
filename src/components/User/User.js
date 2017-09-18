
import React, {Component} from 'react'
import { Button, Header, Icon, Image, Modal, Label, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions'

class User extends Component{

    logout=()=>this.props.actions.userLogout();

    render(){
        const src = 'https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg';
        const { username }= this.props;
        return (
            <Dropdown compact={true} trigger={<Label color={"blue"}><Image avatar spaced='right' src={src}/>{username}</Label>} icon={null}>
                <Dropdown.Menu>
                    <Modal
                        trigger={<Dropdown.Item icon="setting" text="Settings" key="setting"/>}
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
                    <Dropdown.Item onClick={this.logout} icon="log out" text="Logout" key="logout"/>
                </Dropdown.Menu>
            </Dropdown>

        )
    }
}


const mapState = ({ request: { user } }) =>({
    user
});

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect( mapState, mapActions )( User )


