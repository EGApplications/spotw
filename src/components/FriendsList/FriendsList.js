import React, {Component} from 'react'
import { List, Image } from 'semantic-ui-react'
import * as actions from '../../core/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class FriendsList extends Component {

    componentDidMount(){
        this.props.actions.getFriends();
    }

    render() {
        console.log(this.props.user);
        return (
            <List>
                <List.Item>
                    <Image avatar src='/assets/images/avatar/small/rachel.png' />
                    <List.Content>
                        <List.Header as='a'>Rachel</List.Header>
                        <List.Description>Last seen watching <a><b>Arrested Development</b></a> just now.</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <Image avatar src='/assets/images/avatar/small/rachel.png' />
                    <List.Content>
                        <List.Header as='a'>Rachel</List.Header>
                        <List.Description>Last seen watching <a><b>Arrested Development</b></a> just now.</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <Image avatar src='/assets/images/avatar/small/rachel.png' />
                    <List.Content>
                        <List.Header as='a'>Rachel</List.Header>
                        <List.Description>Last seen watching <a><b>Arrested Development</b></a> just now.</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <Image avatar src='/assets/images/avatar/small/rachel.png' />
                    <List.Content>
                        <List.Header as='a'>Rachel</List.Header>
                        <List.Description>Last seen watching <a><b>Arrested Development</b></a> just now.</List.Description>
                    </List.Content>
                </List.Item>
            </List>
        )
    }
}

const mapState = ( ({auth:{user}})=>({user}) );

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect(mapState, mapActions)(FriendsList)